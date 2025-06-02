# Mail Classifier Frontend

This is the frontend for the Mail Classifier app, built with React (Vite).

## Features

- Add multiple email messages
- Remove/edit messages before sending
- Classify all messages in one click
- Clean UI
  
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
git clone https://github.com/masum-rayhan/mail-classifier-fe.git
cd mail-classifier-fe
npm install
```

### Development

```sh
npm run dev
```


### Production Build

```sh
npm run build
```

### Configuration

- By default, the frontend sends requests to `https://localhost:7250/api/EmailClassifier/classify`.
- Update the API URL in `src/App.jsx` if your backend runs elsewhere.

### Environment Variables (optional)

If you wish to make the API endpoint configurable, create a `.env` file:

```
VITE_API_URL=https://localhost:7250/api/EmailClassifier/classify
```

And update the fetch calls accordingly.

## Project Structure

```
src/
  App.jsx
  App.css
  main.jsx
  index.css
public/
  ...
```

## License

MIT
