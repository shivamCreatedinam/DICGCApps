const AsyncStorageContaints = {
  UserId: '@loginKey',
  UserToken: '@USER_TOKEN',
  UserData: '@USER_DETAILS',
  SelectedCity: '@SELECTED_CITY',
  cartBadgeCount: '@CART_BADGE_COUNT',
  wishlistBadgeCount: '@WISHLIST_BADGE_COUNT',
  citymaxProduct: '@CITYMAX_PRODUCT',
  tempUserId: '@temp_user_id',
  tempServerTokenId: '@temp_survey_token',
  surveyLatitude: '@LATITUDE',
  surveyLongitude: '@LONGITUDE',
  surveyNextBlock: '@SURVEYNEXTBLOCK',
  surveyCompleteCount: '@CountSurveyComplete',
  surveyCountInProcessing: '@CountSurveyInProcessing',
  surveyCountInTotal: '@CountSurveyTotal',
};

for (const key in AsyncStorageContaints) {
  if (Object.hasOwnProperty.call(AsyncStorageContaints, key)) {
    const value = AsyncStorageContaints[key];
    console.log(`${key}: ${value}`);
  }
}
export default AsyncStorageContaints;
