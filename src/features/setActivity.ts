import Feature from '../handler/features';

export default new Feature((client) => {
	client.user.setActivity('ts go brr');
});
