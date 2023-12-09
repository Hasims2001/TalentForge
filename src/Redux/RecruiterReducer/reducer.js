import {
  ERROR,
  LOADING,
  JOB_POSTED,
  JOB_GETTED,
  JOB_DELETED,
  JOB_UPDATED,
  
  APPLICATION_GETTED,
  APPLICATION_UPDATED,
  RESET_RECRUITER,
  GOT_AI_OUTPUT_RECRUITER,
} from "../actionType";

const init = {
  loading: false,
  error: "",
  jobposted: [],
  applications: [],
  message: "",
  chatWithAI : [],
  recommendedApplicant : []
};
export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case RESET_RECRUITER:
      return {
        ...state,
        error: "",
        loading: false,
        message: "",
        recommendedApplicant: []
      };
    case JOB_POSTED:
      return {
        ...state,
        loading: false,
        message: "Job posted successfully!",
        jobposted: [...state.jobposted, payload],
      };
    case JOB_GETTED:
      return {
        ...state,
        loading: false,
        jobposted: payload,
      };
    case JOB_UPDATED:
      let update = state.jobposted.map((item) => {
        if (item.id === payload.id) {
          return payload;
        } else {
          return item;
        }
      });
      return {
        ...state,
        loading: false,
        jobposted: update,
        message: "Job post updated successfully!",
      };
    case JOB_DELETED:
      let filterd = state.jobposted.filter((item) => item.id !== payload);
      return {
        ...state,
        loading: false,
        jobposted: filterd,
        message: "Job post deleted successfully!",
      };
    case APPLICATION_GETTED:
      return {
        ...state,
        loading: false,
        applications: payload,
      };
    case APPLICATION_UPDATED:
      let updated = state.applications.map((item) => {
        if (item.id === payload.id) {
          return payload;
        } else {
          return item;
        }
      })
      return {
        ...state,
        loading: false,
        applications: updated,
        message: `Application udpated successfully!`,
      };
    case GOT_AI_OUTPUT_RECRUITER:
      let obj = {
        ...state,
        loading: false,
        chatWithAI : [
          ...state.chatWithAI,
          payload.data
        ]
      }
      if(payload.message === "here is the some recommendation according to job requirements:"){
        obj.recommendedApplicant = payload.data.content
        obj.message = payload.message
      }

      if(payload.message === "sorry, there is no jobseeker available who fullfill your requirements!"){
        obj.chatWithAI = [
          ...obj.chatWithAI,
          {"content": payload.message, "role": "system"}
        ]
      }
      return obj;
    default:
      return state;
  }
};
