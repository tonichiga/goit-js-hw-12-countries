import searchTemplate from './search-template.hbs';
import templateList from './template-list.hbs';
import { notFound } from './not-found.js';
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import { defaults } from '@pnotify/core';

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1500;
// defaults.closerHover = false;

defaultModules.set(PNotifyMobile, {});

const ref = {
  inputRef: document.querySelector('.input-countries'),
  listCountriesRef: document.querySelector('.list-countries'),
  listElementRef: document.querySelector('.template-list'),
};

ref.inputRef.addEventListener(
  'input',
  debounce(e => {
    const nameCountry = e.target.value;
    if (nameCountry.length >= 2) {
      fetch(`https://restcountries.eu/rest/v2/name/${nameCountry}`)
        .then(response => response.json())
        .then(data => data)
        .then(data => {
          if (data.status === 404) {
            ref.listCountriesRef.innerHTML = '';
            ref.listElementRef.innerHTML = '';
            console.log('Не найдено');

            alert({
              text: 'Seach country is not found!',
              addClass: 'angeler-extended',
            });

            return;
          } else if (data.length >= 2 && data.length <= 30) {
            ref.inputRef.classList.add('move-top');
            ref.listCountriesRef.innerHTML = '';
            // ref.listElementRef.innerHTML = '';

            const markup = templateList(data);
            ref.listElementRef.insertAdjacentHTML('beforeend', markup);
          } else {
            ref.inputRef.classList.add('move-top');
            ref.listCountriesRef.innerHTML = '';
            ref.listElementRef.innerHTML = '';

            ref.listCountriesRef.insertAdjacentHTML(
              'beforeend',
              searchTemplate(data),
            );
          }
        });
    }
  }, 1000),
);

// test

// fetch(`https://restcountries.eu/rest/v2/name/usaa`)
//   .then(response => response.json())
//   .then(data => data)
//   .then(data => {
//     console.log(data.status);
//     if (data.length >= 2 && data.length <= 20) {
//       console.log('nooooo');
//       const markup = templateList(data);
//       ref.listElementRef.insertAdjacentHTML('beforeend', markup);
//     } else {
//       ref.listCountriesRef.innerHTML = '';

//       ref.listCountriesRef.insertAdjacentHTML(
//         'beforeend',
//         searchTemplate(data),
//       );
//       console.log(data.length);
//     }
//   });
