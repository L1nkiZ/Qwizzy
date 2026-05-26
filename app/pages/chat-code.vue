<script setup lang="ts">
const codes = [200, 201, 202, 204, 400, 401, 403, 404, 500];
</script>

<template>
	<div>
		<UPageHeader
			title="Si vous avez besoin de vous rappeler à quoi correspondent les codes d'erreur HTTP, vous êtes sur la bonne page."
			class="mb-20"
		/>

		<UPageColumns>
			<img
				v-for="code in codes"
				:key="code"
				:src="`https://http.cat/${code}`"
				alt=""
			/>
		</UPageColumns>
	</div>
</template>
