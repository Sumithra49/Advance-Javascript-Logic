const users = [
  {
    id: 1,
    name: { first: "Alice", last: "Smith" },
    email: "alice@example.com",
  },
  { id: 2, name: { first: "Bob", last: "Johnson" }, email: "bob@example.com" },
  {
    id: 3,
    name: { first: "Charlie", last: "Brown" },
    email: "charlie@example.com",
  },
  {
    id: 4,
    name: { first: "David", last: "Wilson" },
    email: "david@example.com",
  },
];

const input = document.getElementById("search");
const resultsDiv = document.getElementById("results");

// 🔁 Debounce implementation
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// ⌛ Throttle for window events (BONUS)
function throttle(func, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

// 🔍 Deep object search
function searchUsers(query) {
  const q = query.toLowerCase();
  return users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const email = user.email.toLowerCase();
    return fullName.includes(q) || email.includes(q);
  });
}

// ✨ Highlight matched part
function highlight(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// 🎯 Render suggestions
function renderResults(query) {
  const matches = searchUsers(query);
  resultsDiv.innerHTML = "";
  if (!query) return;

  matches.forEach((user) => {
    const highlightedName = highlight(
      `${user.name.first} ${user.name.last}`,
      query
    );
    const highlightedEmail = highlight(user.email, query);

    const div = document.createElement("div");
    div.innerHTML = `${highlightedName} - ${highlightedEmail}`;
    resultsDiv.appendChild(div);
  });
}

// 🧠 Debounced input handler
input.addEventListener(
  "input",
  debounce((e) => {
    const query = e.target.value.trim();
    renderResults(query);
  }, 300)
);

// 🧵 Throttled scroll/resize event (BONUS)
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("Scroll event tracked:", new Date().toLocaleTimeString());
  }, 1000)
);

window.addEventListener(
  "resize",
  throttle(() => {
    console.log("Resize event tracked:", new Date().toLocaleTimeString());
  }, 1000)
);
