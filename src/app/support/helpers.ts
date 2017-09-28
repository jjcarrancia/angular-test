export class Helpers {

  hasClass (el: Element, cls: string) {
    return el.className && new RegExp('(\\s|^)' + cls + '(\\s|$)').test(el.className);
  }

  addClass(el: Element, cls: string) {
    if (el.classList) {
      el.classList.add(cls);
    } else {
      el.className += ' ' + cls;
    }
  }

  removeClass(el: Element, cls: string) {
    if (el.classList) {
      el.classList.remove(cls);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  toggleClass(el: Element, cls: string) {
    if (this.hasClass(el, cls)) {
      this.removeClass(el, cls);
    } else {
      this.addClass(el, cls);
    }
  }

  innerHeight(el: HTMLElement): number {
    return el.offsetHeight;
  }

  outerHeight(el: HTMLElement): number {
    let height = el.offsetHeight;
    const style = getComputedStyle(el);

    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }

  outerWidth(el: HTMLElement): number {
    let width = el.offsetWidth;
    const style = getComputedStyle(el);

    width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    return width;
  }

  innerWidth(el: HTMLElement): number {
    let width = el.clientWidth;
    const style = getComputedStyle(el);

    width -= parseInt(style.marginLeft, 10)
      + parseInt(style.marginRight, 10)
      + parseInt(style.paddingLeft, 10)
      + parseInt(style.paddingRight, 10);
    return width;
  }

  insertAfter(el: Element, referenceNode: Node) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  }

  insertBefore(el: Element, referenceNode: Node) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
  }

  showPageLoader() {
    this.addClass(document.body, 'loading');
    this.addClass(document.getElementById('loaderOverlay'), 'loading');
  }

  hidePageLoader() {
    this.removeClass(document.body, 'loading');
    this.removeClass(document.getElementById('loaderOverlay'), 'loading');
  }
  getParents(el: Element) {
    const parents = [];
    let p = el.parentNode;

    while (p !== null) {
      const o = p;
      parents.push(o);
      p = o.parentNode;
    }

    return parents;
  }

  getParentWithClass(el, cls: string) {
    let parent;
    let parents;
    parents = this.getParents(el);

    for (let i = 0; i < parents.length; i += 1) {
      if (this.hasClass(parents[i], cls)) {
        parent = parents[i];
        break;
      }
    }
    return parent;
  }

  getParameterByName(name: string, url = '') {
      if (url === '') { url = window.location.href; } ;
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
      if (!results) { return null; };
      if (!results[2]) { return ''; };
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  moneyFormat(number: number, comma: string, decimal: string, thousands: string) {
    const commaNumber = isNaN(Math.abs(Number(comma))) ? 2 : Math.abs(Number(comma));
    decimal = decimal === undefined ? '.' : decimal;
    thousands = thousands === undefined ? ',' : thousands;

    const newString = number < 0 ? '-' : '';
    const newNumber = parseInt(Math.abs(number || 0).toFixed(commaNumber), 10);
    const i = String(newNumber);
    const j = i.length > 3 ? i.length % 3 : 0;
   return newString
    + (j ? i.substr(0, j)
    + thousands : '')
    + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
    + (commaNumber
    ? decimal + Math.abs(number - Number(i)).toFixed(commaNumber).slice(2) : '');
  }

  clearSession() {
    localStorage.removeItem('wurcly_user');
    localStorage.removeItem('wurcly_token');
  }

  clearHeaders(formOptions: any, putOptions: any, requestOptions: any) {
    // reset Authorization headers
    formOptions.headers.delete('Authorization');
    putOptions.headers.delete('Authorization');
    requestOptions.headers.delete('Authorization');
  }

  buildQueryString(filters: any = {}) {
      let filterStr = '';
      let sortFilterpart1 = '';
      let sortFilterpart2 = '';

      for (const filter in filters) {


        if (filter === 'branch' && filters['branch'].length > 0) {
          filterStr += 'filters[' + filter + ']=' + filters[filter].join(',') + '&';
          // if(filters['branch'] !== null) {
          //
          // }
        } else if (filter === 'sort') {
          sortFilterpart1 = filters['sort'];
        } else if (filter === 'order') {
          sortFilterpart2 = (filters['order'] === 'desc') ? '!' : '';
        } else {
          filterStr += 'filters[' + filter + ']=' + filters[filter] + '&';
        }
      }
      return filterStr + 'sort=' + sortFilterpart2 + sortFilterpart1;
  }

  /**
   * Evaluates if a value is equal to an empty value when casted.
   * This emulates how the PHP empty() function works.
   *
   * @param  {any}    value
   * @return {boolean}
   */
  empty(value: any) {
    if (  value === null
      ||  value === undefined
      ||  value === ''
      || (typeof value === 'string' && value.trim() === '')
      ||  value === false
      ||  value === 0
      || (value instanceof Array && value.length === 0)
    ) {
      return true;
    }

    return false;
  }
}
