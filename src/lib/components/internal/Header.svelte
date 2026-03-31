<script>
    import Search from '@/components/internal/Search.svelte';
</script>

<header class="py-2 mb-4 font-semibold bg-amber-200">
    <nav class="flex justify-between m-auto max-w-xl">
        <div class="flex gap-2 items-baseline pr-4">
            <a
                href="/"
                class="md:hover:bg-violet-300 active:bg-violet-400 px-1 py-0.5 rounded-md font-extrabold text-2xl"
            >
                Pilsguiden
            </a>
        </div>
        <Search />
    </nav>
</header>