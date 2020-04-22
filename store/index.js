export const state = () => ({
  summary: {
    Countries: []
  },
  filters: {
    search: '',
    sort: 'name'
  },
  theme: {
    isDark: true
  },
  stats: {
    labels: {
      TotalConfirmed: 'Total Confirmed',
      NewConfirmed: 'New Confirmed',
      TotalDeaths: 'Total Deaths',
      NewDeaths: 'New Deaths',
      TotalRecovered: 'Total Recovered',
      NewRecovered: 'New Recovered',
    }
  }
});

export const mutations = {
  SET_SUMMARY(state, payload){
    state.summary = payload;
  },
  SET_SEARCH(state, payload){
    state.filters.search = payload;
  },
  SET_ISDARK(state, payload){
    state.theme.isDark = payload;
  },
  SET_SORT(state, payload){
    state.filters.sort = payload;
  }
};

export const actions = {
  fetchSummary({commit}){
    this.$axios.$get('https://api.covid19api.com/summary').then(resp => {
      commit('SET_SUMMARY', resp);
    });
  },
  toggleIsDark({commit, state}){
    commit('SET_ISDARK', !state.theme.isDark);
  }
};

export const getters = {
  filteredCountries(state,getters){
    if(state.filters.sort || state.filters.sort !== 'name'){
      return getters.sortedCountries;
    }
    return getters.searchCountries;
  },
  searchCountries(state){
    return state.summary.Countries.filter(country => {
      let len = state.filters.search.length;
      return country.Country.substr(0,len).toLowerCase() === state.filters.search.toLowerCase();
    });
  },
  sortedCountries(state, getters){
    let values = JSON.parse(JSON.stringify(getters.searchCountries));
    return values.sort((a, b) => {
      return b[state.filters.sort] - a[state.filters.sort] ;
    })
  }
};
