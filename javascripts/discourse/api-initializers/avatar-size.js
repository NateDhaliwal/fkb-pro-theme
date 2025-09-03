import { service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { withSilencedDeprecations } from "discourse/lib/deprecated";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  // const site = api.container.lookup("service:site");
  function avatarSize() {
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
  
  if (!this.site.mobileView) {
    api.registerValueTransformer(
      "post-avatar-size",
      () => 60
    );
  }
});
