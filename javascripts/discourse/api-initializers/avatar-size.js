import { service } from '@ember/service';
import { withSilencedDeprecations } from "discourse/lib/deprecated";
import { apiInitializer } from "discourse/lib/plugin-api";

function avatarSize(api) {
  // Change avatar size on desktop
  api.registerValueTransformer(
    "post-avatar-size",
    () => 60
  );
  
  // wrap the old widget code silencing the deprecation warnings
  withSilencedDeprecations("discourse.post-stream-widget-overrides", () =>
    oldAvatarSize(api)
  );
}

// old widget code
function oldAvatarSize(api) {
  // Change avatar size on desktop
  api.changeWidgetSetting("post-avatar", "size", 60);
}

export default apiInitializer((api) => {
  // const site = api.container.lookup("service:site");
  @service site;
  
  if (!this.site.mobileView) {
    avatarSize(api);
  }
});
