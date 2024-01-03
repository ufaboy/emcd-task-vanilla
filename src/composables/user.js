import { ref } from 'vue';
import { fetchData, getUrl } from '@/utils/api';

export function useUsers() {
	// Reactive array to store user data.
	const users = ref([]);

	// Reactive object to store query parameters for the API request.
	const query = ref({
		page: 1,
		results: 10,
		inc: 'name,email,picture',
	});

	// Reactive boolean to track if observer is shown.
	const observerShow = ref(true);

	// Reactive boolean to track the loading state of the API request.
	const loading = ref(false);

	/**
	 * Fetches users from the API based on the current query parameters.
	 * Updates the users data and handles the loading state.
	 * If the loading state is already true, it prevents multiple concurrent API calls.
	 */
	async function getUsers() {
		try {
			if (loading.value) {
				return null;
			}
			const url = getUrl(query.value);
			loading.value = true;
			const response = await fetchData(url);
			/* I usually use this code, there is an opinion that this method is not much inferior to apply:
			Array.prototype.push.apply(users.value, response.results); */
			users.value.push(...response.results);
		} catch (error) {
			console.log('getUsers error:', error);
		} finally {
			loading.value = false;
		}
	}

	return { users, query, observerShow, getUsers };
}
