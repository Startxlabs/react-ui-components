import React, { useEffect, useMemo, useRef, useState } from "react";
import { loadStripe, SetupIntent, SetupIntentResult, StripeElementStyle } from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("PublishableKey");

type CardInputValidation = {
  valid: boolean;
  message: string;
};

const initialValidationValues = (message): CardInputValidation => ({ valid: false, message });

const errorMessages = {
  cardRequired: "Please enter card number.",
  expRequired: "Please enter expiry date.",
  cvcRequired: "Please enter cvc number.",
};

interface CheckoutForm {
  style?: StripeElementStyle | undefined;
  fetchSetupIntent: () => Promise<string>;
  handleException: (message: string) => void;
  handleSuccess: (data: SetupIntentResult) => void;
}

const StripeForm: React.FC<CheckoutForm> = ({ style, ...props }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [showErrors, setShowErrors] = useState({
    cardNumber: false,
    expiry: false,
    cvc: false,
  });

  const cardNumValidation = useRef<CardInputValidation>(initialValidationValues(errorMessages.cardRequired));
  const cardExpValidation = useRef<CardInputValidation>(initialValidationValues(errorMessages.expRequired));
  const cardCvcValidation = useRef<CardInputValidation>(initialValidationValues(errorMessages.cvcRequired));

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (cardNumValidation.current.valid && cardExpValidation.current.valid && cardCvcValidation.current.valid) {
        /**
         * If card is valid fetch setup intent
         */
        let setupIntentToken = await props.fetchSetupIntent();

        if (setupIntentToken) {
          const result = await stripe.confirmCardSetup(setupIntentToken, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
            },
          });

          if (result?.error) {
            const message = result?.error?.message;
            props.handleException(message);
          }

          props.handleSuccess(result);
        }
      } else {
        setShowErrors({
          cardNumber: true,
          cvc: true,
          expiry: true,
        });
      }
    } catch (error) {
      console.log({ error });
      props.handleException("Check logs for stripe errror.");
    }
  };

  const cardNumberHandler = (event) => {
    const isValid = !event.error && !event.empty;

    let message = null;

    if (!isValid) {
      message = event.empty ? "Please enter card number." : event.error?.message;
    }

    cardNumValidation.current = {
      ...cardNumValidation.current,
      valid: isValid,
      message,
    };

    setShowErrors((prev) => ({ ...prev, cardNumber: false }));
  };

  const cardExpiryHandler = (event) => {
    const isValid = !event.error && !event.empty;

    let message = null;

    if (!isValid) {
      message = event.empty ? "Please enter expiry date." : event.error?.message;
    }

    cardExpValidation.current = {
      ...cardExpValidation.current,
      valid: isValid,
      message,
    };
    setShowErrors((prev) => ({ ...prev, expiry: false }));
  };

  const cardCvcHandler = (event) => {
    const isValid = !event.error && !event.empty;

    let message = null;

    if (!isValid) {
      message = event.empty ? "Please enter cvc number." : event.error?.message;
    }

    cardCvcValidation.current = {
      ...cardExpValidation.current,
      valid: isValid,
      message,
    };
    setShowErrors((prev) => ({ ...prev, cvc: false }));
  };

  useEffect(() => {
    if (elements) {
      const cardNumberElement = elements.getElement(CardNumberElement),
        cardExpiryElement = elements.getElement(CardExpiryElement),
        cardCvcElement = elements.getElement(CardCvcElement);

      if (cardNumberElement && cardExpiryElement && cardCvcElement) {
        cardNumberElement.on("change", cardNumberHandler);
        cardExpiryElement.on("change", cardExpiryHandler);
        cardCvcElement.on("change", cardCvcHandler);
      }
    }
  }, [elements]);

  return (
    <form noValidate onSubmit={onFormSubmit}>
      <div>
        <label>Card Number</label>
        <CardNumberElement
          options={{
            style,
            placeholder: "",
          }}
        />
        {showErrors.cardNumber && !cardNumValidation.current.valid && <p>{cardNumValidation.current.message}</p>}
      </div>
      <div>
        <label>Expiry Date</label>
        <CardExpiryElement
          options={{
            style,
            placeholder: "",
          }}
        />
        {showErrors.expiry && !cardExpValidation.current.valid && <p>{cardExpValidation.current.message}</p>}
      </div>
      <div>
        <label>CVV</label>
        <CardCvcElement
          options={{
            style,
            placeholder: "",
          }}
        />
        {showErrors.cvc && !cardCvcValidation.current.valid && <p>{cardCvcValidation.current.message}</p>}
      </div>
      <button type="submit" disabled={!stripe || !elements}>
        Add Card
      </button>
    </form>
  );
};

const CheckoutForm = (props: CheckoutForm) => (
  <Elements stripe={stripePromise}>
    <StripeForm {...props} />
  </Elements>
);

export default CheckoutForm;
