<script>
    import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
    let { opts, children } = $props()
</script>

<form
    method={opts.method}
    id={opts.id}
    action={opts.action}
    use:enhance={({ form }) => {
        return async ({ result, update }) => {
            await update();

            if (result.type === 'failure') {
                toast(opts.failureMsg);
            }

            if (result.type === 'success') {
                toast(opts.successMsg);
                opts.onSuccess?.(result);

            }
        };
    }}
>
    {@render children()}
</form>