<script lang="js">
  import { Button } from "$lib/components/ui/button/index.js";
	import Breadcrumb from "@/components/internal/Breadcrumb.svelte";
	import BarList from "@/components/internal/BarList.svelte";
	import NavGroup from "@/components/internal/NavGroup.svelte";
  export let data;
</script>

<article class="m-auto max-w-xl">
  <Breadcrumb 
      links={data.list.breadcrumb}
    />
    <div class="mb-2">
      <NavGroup links={data.list.links} />
    </div>
  <BarList bars={data.list.bars}/>
</article>
