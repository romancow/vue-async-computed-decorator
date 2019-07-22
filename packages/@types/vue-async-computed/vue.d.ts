import Vue from 'vue'
import { AsyncComputedOption, AsyncComputedStateObject} from 'vue-async-computed'

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		asyncComputed?: { [prop: string]: AsyncComputedOption  }
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$asyncComputed: { [prop: string]: AsyncComputedStateObject }
	}
}
