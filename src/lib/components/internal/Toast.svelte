<script>
	let show = false;

	function success() {
		show = true;
		setTimeout(() => (show = false), 2000);
	}
</script>

<div class="fixed right-4 bottom-4 rounded-lg bg-green-600 px-4 py-2 text-white shadow">
	Saved successfully
</div>
