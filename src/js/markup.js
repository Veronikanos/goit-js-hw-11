export function getMarkupElements({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return ` 	<a href="${largeImageURL}"><div class="photo-card">

    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>💗Likes: </b>${likes}
      </p>
      <p class="info-item">
        <b>👀Views: </b>${views}
      </p>
      <p class="info-item">
        <b>📝Comments: </b>${comments}
      </p>
      <p class="info-item">
        <b>📥Downloads: </b>${downloads}
      </p>
    </div>
		
  </div></a>
	`;
}
