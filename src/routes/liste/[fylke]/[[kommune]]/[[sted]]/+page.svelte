<script lang="js">
  import { page } from '$app/stores';
  import BarList from "@/components/internal/BarList.svelte";
  import Breadcrumb from "@/components/internal/Breadcrumb.svelte";
  import NavGroup from "@/components/internal/NavGroup.svelte";
  import { H2 } from '@/styles/styles.js';
  let { data } = $props();

  const title = $derived(
		$page.params.sted
			? data.list.breadcrumb[2]?.name
			: $page.params.kommune
				? data.list.breadcrumb[1]?.name
				: data.list.breadcrumb[0].name
	);
</script>

<article class="m-auto max-w-xl">
  <Breadcrumb 
      links={data.list.breadcrumb}
    />
    <div class="mb-2">
      <NavGroup links={data.list.links} />
    </div>
  <h2 class={H2}>Ølpriser – {title}</h2>
  <BarList bars={data.list.bars}/>
</article>
