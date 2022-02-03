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
