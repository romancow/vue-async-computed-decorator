declare module 'vue-async-computed' {
	import { PluginObject } from 'vue'

	export type AsyncComputedOption = (() => Promise<any>) | {
		get<T>(): Promise<T>,
		default?: (<T>() => T) | any,
		watch?: string[],
		shouldUpdate?(): boolean
		lazy?: boolean
	}

	export enum AsyncComputedState {
		Updating = 'updating',
		Success = 'success',
		Error = 'error'
	}

	export type AsyncComputedStateObject = {
		state: AsyncComputedState
		updating: boolean
		success: boolean
		error: boolean
		exception: Error | null
		update(): void
	}

	export type AsyncComputedPluginOptions = {
		errorHandler?(error: string | Error): void
		useRawError?: boolean
		default?: any
	}

	const AsyncComputed: PluginObject<AsyncComputedPluginOptions>
	export default AsyncComputed
}
