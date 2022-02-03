# React UI Components

## Google Places

Add below script in head

```
 <script async=""
    src="https://maps.googleapis.com/maps/api/js?key={key}&amp;v=3.exp&amp;libraries=places"></script>
```

### Installation

If using npm,

```bash
    npm i react-places-autocomplete
```

or yarn,

```bash
    yarn add react-places-autocomplete
```

**_If typescript,_**

npm

```bash
    npm i -D @types/react-places-autocomplete
```

yarn

```bash
    yarn add -D @types/react-places-autocomplete
```

#### Usage

| Props         | Type                        | Description                                            |
| :------------ | :-------------------------- | :----------------------------------------------------- |
| input         | React Element               | **Required**                                           |
| handleChange  | (data:LocationInfo) => void | **Required** Pass selected address to parent component |
| value         | String                      | **Required** Render selected value                     |
| listItemStyle | ListItemStyle               | Custom style for list items                            |

#### Types

```
type LocationInfo = {
  lat: number;
  lng: number;
  address: string;
  postalCode: string | null;
};

type ListItemStyle = {
  hover?: React.CSSProperties;
  style: React.CSSProperties;
};

```

#### Example

```
import { LocationInput } from "./components/GooglePlaces";

...

return (
    <LocationInput
        listItemStyle={{
        style: {
            borderWidth: 1,
        },
        hover: {
            background: "red",
        },
        }}
        input={(props) => <input {...props} />}
        handleChange={(value) => console.log({ value })}
        value=""
    />
)

```

## Stripe Form

If using npm,

```bash
    npm i @stripe/react-stripe-js @stripe/stripe-js
```

or yarn,

```bash
    yarn add @stripe/react-stripe-js @stripe/stripe-js
```

#### Usage

| Props            | Type                               | Description                                               |
| :--------------- | :--------------------------------- | :-------------------------------------------------------- |
| style            | StripeElementStyle                 | **Required**                                              |
| fetchSetupIntent | () => Promise<string>              | **Required** Api call for fetching setup intent token     |
| handleException  | (message: string) => void          | **Required** For handling exception example toast message |
| handleSuccess    | (data: SetupIntentResult) => void; | **Required** Once intent successfully confirmed           |

#### Example

```
import { StripeForm } from "./components/StripeForm";

...
const simulateFetch = async () => {
    return "seti_";
};

<StripeForm
    fetchSetupIntent={simulateFetch}
    handleException={(message) => console.error(message)}
    handleSuccess={(response) => {
    console.log({ response });
    }}
    style={{
    base: {
        fontSize: "0.88rem",
        padding: "13px 22px",
        color: "#1b3e87",
        letterSpacing: "0.025em",
        fontWeight: 400,
        lineHeight: "45px",
        backgroundColor: "#f5f5f5",

        "::placeholder": {
        color: "#1b3e87",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        fontSize: "0.88rem",
        },
    },
    invalid: {
        color: "#F53997",
    },
    }}
/>
```
