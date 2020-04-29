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
  timeline: {
    loading: false,
    confirmed: [],
    deaths: [],
    recovered: [],
    active: 'confirmed'
  },
  stats: {
    labels: {
      TotalConfirmed: 'Total Confirmed',
      NewConfirmed: 'New Confirmed',
      TotalDeaths: 'Total Deaths',
      NewDeaths: 'New Deaths',
      TotalRecovered: 'Total Recovered',
      NewRecovered: 'New Recovered',
      confirmedPerPop: 'Confirmed per population',
      population: 'Population'
    }
  },
  map: {
    geojson: {
      features: []
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
  },
  SET_TIMELINE_CONFIRMED(state, payload){
    state.timeline.confirmed = payload;
  },
  SET_TIMELINE_DEATHS(state, payload){
    state.timeline.deaths = payload;
  },
  SET_TIMELINE_RECOVERED(state, payload){
    state.timeline.recovered = payload;
  },
  SET_TIMELINE_LOADING(state, payload){
    state.timeline.loading = payload;
  },
  SET_ACTIVE_TIMELINE(state, payload){
    state.timeline.active = payload;
  },
  SET_GEOJSON(state,payload){
    state.map.geojson = payload;
  }
};

export const actions = {
  fetchSummary({commit}){
    this.$axios.$get('http://localhost:8000/api/summary').then(resp => {
      commit('SET_SUMMARY', resp);
    });
  },
  toggleIsDark({commit, state}){
    commit('SET_ISDARK', !state.theme.isDark);
  },
  fetchTimeline({commit}, {slug, type}){
    commit('SET_TIMELINE_LOADING', true);
    this.$axios.$get(`http://localhost:8000/api/corona/dayone/country/${slug}/status/${type}/live`).then(resp => {
      commit('SET_TIMELINE_' + type.toUpperCase(), resp);
      commit('SET_ACTIVE_TIMELINE', type);
      commit('SET_TIMELINE_LOADING', false);
    });
  },
  fetchGeoJson({commit}){
    this.$axios.$get('http://localhost:8000/api/geojson').then(resp=> {
      commit('SET_GEOJSON', resp);
    })
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
      if(b[state.filters.sort] > a[state.filters.sort]) {
        return 1;
      }
      if(b[state.filters.sort] < a[state.filters.sort]) {
        return -1;
      }
      return 0;
    })
  },
  activeTimelineLabels(state){
    return state.timeline[state.timeline.active]
      .map(data => data.Date)
      .filter((value,index,self) => self.indexOf(value) === index);
  },
  confirmed(state, getters){
    let data = [];
    getters.activeTimelineLabels.forEach((date,index) => {
      data[index] = 0;
      state.timeline.confirmed.forEach(stat => {
        if(stat.Date === date) {
          return data[index] += stat.Cases;
        }
      })
    });
    return data;
  },
  deaths(state, getters){
    let data = [];
    getters.activeTimelineLabels.forEach((date,index) => {
      data[index] = 0;
      state.timeline.deaths.forEach(stat => {
        if(stat.Date === date) {
          return data[index] += stat.Cases;
        }
      })
    });
    return data;
  },
  recovered(state, getters){
    let data = [];
    getters.activeTimelineLabels.forEach((date,index) => {
      data[index] = 0;
      state.timeline.recovered.forEach(stat => {
        if(stat.Date === date) {
          return data[index] += stat.Cases;
        }
      })
    });
    return data;
  },
  geoJson(state){
    let features = state.map.geojson.features;
    return {type: "FeatureCollection", features: features};
  }
};
