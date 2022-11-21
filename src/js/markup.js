export function renderMarkup(arr) {
  console.log(arr.collections);
  return `
  <li><img src="${arr.webformatURL}" width="300" alt=""></li>
  `;
  // return `<li>helloooo${arr.collections}</li>`;
}
