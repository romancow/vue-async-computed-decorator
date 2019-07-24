import { createDecorator } from 'vue-class-component'
import AsyncComputedPlugin, { AsyncComputedOption, AsyncComputedPluginOptions } from '@romancow/vue-async-computed'
import Vue, { PluginObject } from 'vue'

export type AsyncComputedOptions<T> = {
	default?: (() => T) | T,
	watch?: string[],
	shouldUpdate?(): boolean
	lazy?: boolean
}

type AsyncComputedDecorator = (<T>(options?: AsyncComputedOptions<T>) => MethodDecorator) & PluginObject<AsyncComputedPluginOptions>

const AsyncComputed = function <T = any>(options?: AsyncComputedOptions<T>) {
	return (target: Vue, propertyKey: string , descriptor: TypedPropertyDescriptor<Promise<T>>) => {
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
} as AsyncComputedDecorator

AsyncComputed.install = AsyncComputedPlugin.install

export * from '@romancow/vue-async-computed'
export default AsyncComputed
