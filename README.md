[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# 👾 Full-stack Boilerplate

## Installation:

Clone this repo and npm install.

```bash
npm install
```

## Running:

### Production

```bash
npm start
```

### Development

```
npm run develop
```

### Front-end Development

```
npm run start:client
```

Listen: `http://localhost:4000`

### Back-end Development

```
npm run start:server
```

Listen: `http://localhost:3000`

### Test

```
npm test
```

### Paths

Base structure:

```
	/client
		index.js
		template.html
	/common
		/app
			index.js
		/components
			/ComponentName
				index.js
				index.scss
		/config
			index.js
		/containers
			/blocks
			/forms
			/layouts
			/pages
		/helpers
			index.js
		/reducers
			index.js
		/redux
			index.js
		/routes
			index.js
		/selectors
			index.js
		/services
		/store
			index.js
	/server
		index.js
		renderer.js
```

## License

This project is open source and available under the [MIT License](LICENSE).
