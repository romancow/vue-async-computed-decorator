# vue-async-computed-decorator
Decorator and typescript support for the [`vue-async-computed`](https://github.com/foxbenjaminfox/vue-async-computed) module

## Installation

Add a scope mapping for the GitHub npm package manager by adding a `.npmrc` file with the line:
```
@romancow:registry=https://npm.pkg.github.com/
```

Then install the package:
```
npm install @romancow/vue-async-computed-decorator
```
or
```
yarn add @romancow/vue-async-computed-decorator
```

More info on using the GitHub npm package registry [here](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#installing-a-package).

Install the `vue-async-computed` Vue plugin:
```javascript
import Vue from 'vue'
import AsyncComputed from '@romancow/vue-async-computed-decorator'

Vue.use(AsyncComputed)
```

## Usage

You can just use the package for it's type definitions and use the plugin as outlined in the [`vue-async-computed`](https://github.com/foxbenjaminfox/vue-async-computed#usage-example) readme.

Or use it along with [`vue-class-component`](https://github.com/vuejs/vue-class-component) as a typescript decorator on a `get` accessor that returns a `Promise`. Corresponding `set` accessors are not supported and will be ignored.
```typescript
import Vue from 'vue'
import AsyncComputed from '@romancow/vue-async-computed-decorator'

@Component
export class MyComponent extends Vue {
	data = 123

	get computedData() { return data + 1 }

	@AsyncComputed()
	get asyncComputedData() {
		return someAsyncMethod()
	}
}
```

You can also pass `default`, `watch`, `shouldUpdate`, and `lazy` options (see [`vue-async-computed`](https://github.com/foxbenjaminfox/vue-async-computed#usage-example) for more details on these):
```typescript
import Vue from 'vue'
import AsyncComputed from '@romancow/vue-async-computed-decorator'

@Component
export class MyComponent extends Vue {
	data = 123

	get computedData() { return data + 1 }

	@AsyncComputed({
		default: "Loading...",
		watch: ['data'],
		shouldUpdate() { return this.computedData > 200 }
		lazy: true
	})
	get asyncComputedData() {
		return someAsyncMethod()
	}
}
```
