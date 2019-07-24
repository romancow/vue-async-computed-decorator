import { createDecorator } from 'vue-class-component'
import AsyncComputedPlugin, { AsyncComputedOption } from '@romancow/vue-async-computed'
import Vue from 'vue'

export type AsyncComputedOptions<T> = {
	default?: (() => T) | T,
	watch?: string[],
	shouldUpdate?(): boolean
	lazy?: boolean
}

const AsyncComputed = function <T = any>(options?: AsyncComputedOptions<T>) {
	return <V extends Vue, K extends keyof V & string, P extends V[K] & Promise<T>>(target: V, propertyKey: K , descriptor: TypedPropertyDescriptor<P>) => {
		createDecorator((vueOpts, prop: string) => {
			const { asyncComputed = {}, computed: { [prop]: opt, ...computed } = {}} = vueOpts
			asyncComputed[prop] = {
				get: (opt instanceof Function) ? opt : opt.get,
				...options
			} as AsyncComputedOption
			vueOpts.computed = computed
			vueOpts.asyncComputed = asyncComputed
		})(target, propertyKey)
	}
}

AsyncComputed.install = AsyncComputedPlugin.install

export * from '@romancow/vue-async-computed'
export default AsyncComputed
