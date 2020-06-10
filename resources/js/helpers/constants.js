/*
 * Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup geliştirilen bütün kaynak kodlar
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 * Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

const Constants = {
  accessToken: 'access_token',
  permissions: 'permissions',
  roles: 'roles',
  expires_in: 'expires_in',
  generalInfo: 'general_info'
}

const ResponseCodes = {
  CODE_SUCCESS: 1000,
  CODE_UNAUTHORIZED: 1001,
  CODE_NOT_FOUND: 1002,
  CODE_INFO: 1003,
  CODE_WARNING: 1004,
  CODE_ERROR: 1005
}

const MessengerConstants = {
  errorMessage: 'Sunucu bazlı bir hata meydana geldi!'
}

const Mutations = {
  LOGIN_SUCCESSFUL: 'loginSuccessful',
  LOGOUT: 'logout',
  LOGIN_ERROR: 'loginError',
  IS_SIGNING_IN: 'isSigningIn',
  SEARCH_QUESTIONS: 'searchQuestions',
  SET_SEARCH_QUESTIONS_RESULT: 'setSearchQuestionsResult',
  SET_USER: 'setUser',
  SAVE_TOKEN: 'saveToken',
  SET_ROLES: 'setRoles',
  SET_GENERAL_INFO: 'setGeneralInfo'
}

export { MessengerConstants, ResponseCodes, Mutations }
export default Constants
