<script lang="ts">
	import { elements, selected, type Elements, blendModes, ComponentMap } from '$lib/elements';
	import { get, writable, type Writable } from 'svelte/store';
	import MaterialSymbolsLockOpenOutlineRounded from '~icons/material-symbols/lock-open-outline-rounded';
	import MaterialSymbolsLock from '~icons/material-symbols/lock';
	import ThemeSelector from './ThemeSelector.svelte';
	import { settings } from '$lib';
	export let element: Writable<Elements>;
	$: idx = $elements.indexOf(element);

	function del() {
		$elements.splice(idx, 1);
		$elements = $elements;
		$selected = null;
	}

	function clone() {
		const c: Elements = {
			...$element,
			name: `${$element.name} (copy)`,
			position: [$element.position[0] + 10, $element.position[1] + 10]
		};
		const idx = $elements.push(writable(c));
		$elements = $elements;
		$selected = $elements[idx - 1];
	}

	function head() {
		$elements.push(element);
		$elements = $elements;
		$elements.splice(idx, 1);
		$elements = $elements;
	}

	function tail() {
		$elements.splice(idx, 1);
		$elements = $elements;
		$elements.unshift(element);
		$elements = $elements;
	}
</script>

<div class="flex h-screen w-full flex-col gap-2 bg-base-200 bg-opacity-80 p-2 backdrop-blur-md">
	<div class="flex w-full items-center">
		<input
			class="input input-ghost w-full p-0 text-xl"
			contenteditable="true"
			bind:value={$element.name}
		/>
		<p>{idx}</p>
	</div>
	<hr />
	<ul class="flex flex-col gap-2">
		<li class="join">
			<p class="btn btn-primary join-item btn-sm">x</p>
			<input
				type="number"
				class="input join-item input-bordered input-sm w-full max-w-xs"
				bind:value={$element.position[0]}
			/>
			<p class="btn btn-error join-item btn-sm p-0">
				<MaterialSymbolsLockOpenOutlineRounded class="p-1" />
			</p>
			<input
				type="number"
				class="input join-item input-bordered input-sm w-full max-w-xs"
				bind:value={$element.position[1]}
			/>
			<p class="btn btn-secondary join-item btn-sm">y</p>
		</li>

		{#if $element.type === 'text'}
			<li class="">
				font size
				<input type="number" class="input input-sm w-full" bind:value={$element.size} />
			</li>
		{:else}
			<li class="join">
				<p class="btn btn-primary join-item btn-sm">w</p>
				<input
					type="number"
					class="input join-item input-bordered input-sm w-full max-w-xs"
					bind:value={$element.size[0]}
				/>
				<p class="btn btn-error join-item btn-sm p-0">
					<MaterialSymbolsLockOpenOutlineRounded class="p-1" />
				</p>
				<input
					type="number"
					class="input join-item input-bordered input-sm w-full max-w-xs"
					bind:value={$element.size[1]}
				/>
				<p class="btn btn-secondary join-item btn-sm">h</p>
			</li>
		{/if}

		<li>rotation: <input class="input input-sm" type="number" bind:value={$element.rotation} /></li>
		<li>fill: <input type="color" bind:value={$element.fill} /></li>
		<li>
			outline:
			<div class="join max-w-full overflow-clip">
				<input class="input join-item input-sm" type="number" bind:value={$element.outline[0]} />
				<input class="join-item m-0 w-16 p-0" type="color" bind:value={$element.outline[1]} />
			</div>
		</li>
		<li>
			opacity: {$element.opacity}%
			<input type="range" min="0" max="100" bind:value={$element.opacity} class="range" />
		</li>
		<li>
			blend mode:
			<select class="input input-sm w-full" bind:value={$element.blendMode}>
				{#each blendModes as mode}
					<option value={mode}>{mode}</option>
				{/each}
			</select>
		</li>
		<li class="join">
			<button class="btn btn-primary join-item btn-sm w-1/2" on:click={head}>front!</button>
			<button class="btn btn-secondary join-item btn-sm grow" on:click={tail}>back!</button>
		</li>
		<li class="join">
			<button class="btn btn-info join-item btn-sm w-1/2" on:click={clone}>clone!</button>
			<button class="btn btn-error join-item btn-sm grow" on:click={del}>delete!</button>
		</li>
		<hr />

		{#if $element.type === 'rect'}
			<ul>
				<li class="">
					roundness:
					<div class="input-bordered grid grid-cols-2 overflow-hidden rounded-2xl border-[2px]">
						<input
							class="input input-bordered input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[0]}
						/>
						<input
							class="input input-bordered input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[1]}
						/>
						<input
							class="input input-bordered input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[3]}
						/>
						<input
							class="input input-bordered input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[2]}
						/>
					</div>
				</li>
			</ul>
		{/if}
		<hr />
		<ThemeSelector />
		<button
			on:click={() => {
				$settings.gpuAcceleration = !$settings.gpuAcceleration;
			}}
		>
			gpuAcceleration:
			{#if $settings.gpuAcceleration}
				on
			{:else}
				off
			{/if}
		</button>
		<div>
			zoom speed: {$settings.zoomMultiplier}x
			<input type="range" min="0" max="10" bind:value={$settings.zoomMultiplier} class="range" />
		</div>
	</ul>
</div>
