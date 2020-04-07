import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
        teams: [],
        meetings: []
    },
    actions: {
        fetchUsers({ commit }, user){
            commit('FETCH_USERS', user);
        },
        addUser({ commit }, user) {
            commit('ADD_USER', user);
        },
        clearUsers({ commit }) {
            commit('CLEAR_USER');
        },
        fetchTeams({ commit }, team) {
            commit('FETCH_TEAMS', team);
        },
        addTeam({ commit }, team) {
            commit('ADD_TEAM', team);
        },
        clearTeams({ commit }) {
            commit('CLEAR_TEAMS');
        },
        fetchMeetings({ commit }, meeting) {
            commit('FETCH_MEETINGS', meeting);
        },
        addMeetings({ commit }, meeting) {
            commit('ADD_MEETINGS', meeting);
        },
        clearMeetings({ commit }) {
            commit('CLEAR_MEETINGS');
        },
        addUserToTeam({ commit }, { user, teamId }) {
            commit('ADD_USER_TO_TEAM', { user, teamId });
        },
        removeUserOfTeam({ commit }, { user, teamId }) {
            commit('REMOVE_USER_OF_TEAM', { user, teamId });
        },
        changeStatusMeeting({ commit }, data) {
            commit('CHANGE_STATUS_MEETING', data);
        }
    },
    mutations: {
        FETCH_USERS(state, users) {
            state.users.push(...users);
        },
        ADD_USER(state, user) {
            user.id = state.users.length;
            state.users.push(user);
        },
        CLEAR_USERS(state) {
            state.users = [];
        },
        FETCH_TEAMS(state, teams) {
            state.teams.push(...teams);
        },
        ADD_TEAM(state, team) {
            team.id = state.teams.length;
            team.users = [];
            state.teams.push(team);
        },
        CLEAR_TEAMS(state) {
            state.teams = [];
        },
        FETCH_MEETINGS(state, meetings) {
            state.meetings.push(...meetings);
        },
        ADD_MEETINGS(state, meeting) {
            meeting.id = state.meetings.length;
            state.meetings.push(meeting);
        },
        CLEAR_MEETINGS(state) {
            state.meetings = [];
        },
        ADD_USER_TO_TEAM(state, { user, teamId }) {
            let teamIndex = _.findIndex(state.teams, team => team.id == teamId);
            state.teams[teamIndex].users.push(user);
        },
        REMOVE_USER_OF_TEAM(state, { user, teamId }) {
            let teamIndex = _.findIndex(state.teams, team => team.id == teamId);
            let userArr = state.teams[teamIndex].users;
            let usersIndex = _.findIndex(userArr, item => item.id == user.id);
            userArr.splice(usersIndex, 1);
        },
        CHANGE_STATUS_MEETING(state, data) {
            let meetingIndex = _.findIndex(state.meetings, meeting => meeting.id == data.id);
            state.meetings[meetingIndex].status = data.status;
            if (data.status == 'inProgress') state.meetings[meetingIndex].factStart = data.time;
            if (data.status == 'done') state.meetings[meetingIndex].factEnd = data.time;
        }
    },
    getters: {
        users(state) {
            return state.users
        },
        teams(state) {
            return state.teams
        },
        meetings(state) {
            return state.meetings
        }
    },
    modules: {}
})

export default store
