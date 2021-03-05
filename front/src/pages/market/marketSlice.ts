import { createSlice } from '@reduxjs/toolkit';
import { marketDetailInterface } from '../../interfaces/MarketInterface';

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    marketList: [],
    marketDetail: null,
    marketPost: [],
    myMarketList: [],

    isMaketDetailLoadLoading: false,
    isMaketDetailLoadDone: false,
    isMaketDetailLoadError: null,

    isMarketLoadLoading: false,
    isMarketLoadDone: false,
    isMarketLoadError: null,

    isMarketPostLoadLoading: false,
    isMarketPostLoadDone: false,
    isMarketPostLoadError: null,

    addMarketPostLoading: false,
    addMarketPostDone: false,
    addMarketPostError: null,

    addMarketLoading: false,
    addMarketDone: false,
    addMarketError: null,

    deleteMarketPostLoading: false,
    deleteMarketPostDone: false,
    deleteMarketPostError: null,
  },
  reducers: {
    marketLoadRequest(state) {
      state.isMarketLoadLoading = true;
      state.isMarketLoadDone = false;
    },
    marketLoadSuccess(state, action) {
      state.isMarketLoadLoading = false;
      state.isMarketLoadDone = true;
      state.marketList = action.payload.data;
    },
    marketLoadError(state, action) {
      state.isMarketLoadLoading = false;
      state.isMarketLoadDone = false;
      state.isMarketLoadError = action.payload.error;
    },

    maketDetailLoadRequest(state, action) {
      state.isMaketDetailLoadLoading = true;
      state.isMaketDetailLoadDone = false;
    },
    maketDetailLoadSuccess(state, action) {
      state.isMaketDetailLoadLoading = false;
      state.isMaketDetailLoadDone = true;
      state.marketDetail = action.payload.data;
    },
    maketDetailLoadError(state, action) {
      state.isMaketDetailLoadLoading = false;
      state.isMaketDetailLoadDone = false;
      state.isMaketDetailLoadError = action.payload.error;
    },

    maketpostLoadRequest(state, action) {
      state.isMarketPostLoadLoading = true;
      state.isMarketPostLoadDone = false;
    },
    maketpostLoadSuccess(state, action) {
      state.isMarketPostLoadLoading = false;
      state.isMarketPostLoadDone = true;
      state.marketDetail = action.payload.data;
    },
    maketpostLoadError(state, action) {
      state.isMarketPostLoadLoading = false;
      state.isMarketPostLoadDone = false;
      state.isMarketPostLoadError = action.payload.error;
    },

    addMarketPostRequest(state, action) {
      state.addMarketPostLoading = true;
      state.addMarketPostDone = false;
    },
    addMarketPostSuccess(state, action) {
      state.addMarketPostLoading = false;
      state.addMarketPostDone = true;
      // state.marketList.concat(action.payload.data);
    },
    addMarketPostError(state, action) {
      state.addMarketPostLoading = false;
      state.addMarketPostDone = false;
      state.addMarketPostError = action.payload.error;
    },

    addMarketRequest(state, action) {
      state.addMarketLoading = true;
      state.addMarketDone = false;
    },
    addMarketSuccess(state, action) {
      state.addMarketLoading = false;
      state.addMarketDone = true;
      state.myMarketList = [].concat(action.payload);
    },
    addMarketError(state, action) {
      state.addMarketLoading = false;
      state.addMarketDone = false;
      state.addMarketError = action.payload.error;
    },

    deleteMarketPostRequest(state, action) {
      state.deleteMarketPostLoading = true;
      state.deleteMarketPostDone = false;
    },
    deleteMarketPostSuccess(state, action) {
      state.deleteMarketPostLoading = false;
      state.deleteMarketPostDone = true;
      state.marketList.filter((data: marketDetailInterface) => data.marketId !== action.payload);
    },
    deleteMarketPostError(state, action) {
      state.deleteMarketPostLoading = false;
      state.deleteMarketPostDone = false;
      state.deleteMarketPostError = action.payload.error;
    },
    resetMyMarketList(state, action) {
      state.myMarketList = [];
    },
  },
});

export const {
  marketLoadRequest,
  marketLoadSuccess,
  marketLoadError,
  maketpostLoadRequest,
  maketpostLoadSuccess,
  maketpostLoadError,
  maketDetailLoadRequest,
  maketDetailLoadSuccess,
  maketDetailLoadError,
  addMarketPostRequest,
  addMarketPostSuccess,
  addMarketPostError,
  addMarketRequest,
  addMarketSuccess,
  addMarketError,
  resetMyMarketList,
} = marketSlice.actions;

export default marketSlice.reducer;
