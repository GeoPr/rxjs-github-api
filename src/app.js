import { fromEvent, EMPTY } from 'rxjs'
import { map, mergeMap, filter, debounceTime, switchMap, catchError, distinctUntilChanged, tap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const url = 'https://api.github.com/search/users?q='

const input = document.getElementById('input')
const result = document.getElementById('result')

const stream$ = fromEvent(input, 'input').pipe(
  map(e => e.target.value),
  debounceTime(1000),
  distinctUntilChanged(),
  tap(() => (result.innerHTML = '')),
  filter(value => value.trim()),
  switchMap(value => ajax.getJSON(url + value).pipe(
    catchError(err => EMPTY)
  )),
  map(response => response.items),
  mergeMap(items => items)
)

stream$.subscribe({
  next: value => {
    console.log(value)
    const template = `
      <div class="card">
        <div class="card-image">
          <img src=${value.avatar_url}>
          <span class="card-title">${value.login}</span>
        </div>
        <div class="card-action">
          <a href=${value.html_url} target="_blank">Открыть GitHub</a>
        </div>
      </div>
    `

    result.insertAdjacentHTML('beforeend', template)
  }
})
