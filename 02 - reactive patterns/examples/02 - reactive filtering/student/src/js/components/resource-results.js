const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush d-flex flex-column flex-fill">

        <!-- results will be injected here, by selecting for .list-group and embedding inner HTML -->

      </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  #results = [];
  #filteredResults = [];
  #filters = {
    searchQuery: '',
    category: 'all',
    openNow: false,
    virtual: false,
  };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._handleResultClick = this._handleResultClick.bind(this);
  }

  set results(data) {
    this.#results = data;
    this.#filteredResults = [...data];
    this.render();
  }

  set filters(filters) {
    this.#filters = filters;
    this.#applyFilters();
  }

  #applyFilters() {
    const { searchQuery, category, openNow, virtual } = this.#filters;
    const q = searchQuery.trim().toLowerCase();
    this.#filteredResults = this.#results.filter(
      (item) => {
        const matchesSearchQuery = !q || [item.title, item.summary, item.location].join('').toLowerCase().includes(q);

        const matchesCategory = !category || category === 'all' || item.category.toLowerCase() === category.toLowerCase();

        const matchesOpenNow = !openNow || item.openNow;

        const matchesVirtual = !virtual || item.virtual;

        return matchesSearchQuery && matchesCategory && matchesOpenNow && matchesVirtual;
      });
    this.render();
  }

  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      const resultID = button.getAttribute('data-id');
      const result = this.#results.find(r => r.id === resultID); // note that we're finding the data object from the array, not the UI row!

      const resultSelectedEvent = new CustomEvent(
        'resource-selected',
        {
          detail: { result },
          bubbles: true,
          composed: true,
        },
      );

      this.dispatchEvent(resultSelectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  render() {
    const content = template.content.cloneNode(true);
    const listGroup = content.querySelector('.list-group');

    if (this.#filteredResults.length) {
      const resultsHTML = this.#filteredResults.map(
        result => `
        <button type="button" class="list-group-item list-group-item-action flex-fill" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`,
      );

      listGroup.innerHTML = resultsHTML.join(''); // resultsHTML is an array, so combine each HTML blob back-to-back into a string
    } else {
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);
