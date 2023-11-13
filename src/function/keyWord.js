export default function keyWord(title, description) {
	document.title = title; // Встановлюємо заголовок сторінки

	const metaDescription = document.querySelector('meta[name="description"]');
	if (metaDescription) {
		metaDescription.setAttribute('content', description); // Встановлюємо опис сторінки
	} else {
		const newMetaDescription = document.createElement('meta');
		newMetaDescription.setAttribute('name', 'description');
		newMetaDescription.setAttribute('content', description);
		document.head.appendChild(newMetaDescription); // Створюємо та вставляємо новий елемент <meta> з описом сторінки
	}
}
