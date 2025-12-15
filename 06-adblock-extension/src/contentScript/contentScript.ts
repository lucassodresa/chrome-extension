const rules: {
  [url: string]: () => void;
} = {
  "https://www.globo.com/": filterGlobo,
};

function filterGlobo() {
  const wrapper = document.querySelector(".ad-container");
  document.body.removeChild(wrapper);
}

function filterGlobo2() {
  const wrapper = document.querySelector(".ad-container");
  document.body.removeChild(wrapper);
}

if (document.URL in rules) {
  console.log(document.URL);
  rules[document.URL]();
}
