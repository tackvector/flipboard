<script lang="ts">
	import { tool, zoom } from '$lib';
	import TablerTrianglePlus2 from '~icons/tabler/triangle-plus-2';
	import TablerCirclePlus2 from '~icons/tabler/circle-plus-2';
	import TablerSquarePlus2 from '~icons/tabler/square-plus-2';
	import TablerZoomPan from '~icons/tabler/zoom-pan';
	import GisCoordSystem from '~icons/gis/coord-system';
	import FluentSelectObject24Regular from '~icons/fluent/select-object-24-regular';
	import FluentText12Regular from '~icons/fluent/text-12-regular';
	import ArrowImport24Regular from '~icons/fluent/arrow-import-24-regular';
	import Tool from './Tool.svelte';
</script>

<ul
	class="z-10 flex h-screen w-12 flex-col justify-between overflow-clip bg-base-300 bg-opacity-80 text-xl backdrop-blur-md"
>
	<div>
		<Tool id="pan">
			<TablerZoomPan class="p-2" />
		</Tool>
		<Tool id="select">
			<FluentSelectObject24Regular class="p-2" />
		</Tool>
		<Tool id="text">
			<FluentText12Regular class="p-2" />
		</Tool>
		<Tool id="rectangle">
			<TablerSquarePlus2 class="p-2" />
		</Tool>
		<Tool id="ellipse">
			<TablerCirclePlus2 class="p-2" />
		</Tool>
		<Tool id="triangle" disabled={true}>
			<TablerTrianglePlus2 class="p-2" />
		</Tool>
		<Tool id="photo">
			<ArrowImport24Regular class="p-2" />
		</Tool>
	</div>
	<div>
		<input class="input input-xs rounded-none" type="number" bind:value={$zoom} />
	</div>
</ul>
