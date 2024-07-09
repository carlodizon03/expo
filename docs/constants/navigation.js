import frontmatter from 'front-matter';
import fs from 'fs';
import path from 'path';
import { u as make } from 'unist-builder';
import { URL, fileURLToPath } from 'url';

import { VERSIONS } from './versions.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.resolve(dirname, '../pages');

// TODO(cedric): refactor docs to get rid of the directory lists

/** Manual list of directories to categorize as "Home" */
const homeDirectories = [
  'get-started',
  'develop',
  'config-plugins',
  'debugging',
  'deploy',
  'review',
];
/** Manual list of directories to categorize as "Learn" */
const learnDirectories = ['tutorial', 'ui-programming', 'additional-resources'];
/** Manual list of directories to categorize as "Archive" */
const archiveDirectories = ['archive'];
/** Manual list of directories to categorize as "Reference" */
const referenceDirectories = ['versions', 'technical-specs', 'more'];
/** Private preview section which isn't linked in the documentation */
const previewDirectories = ['feature-preview', 'preview'];

/** All other unlisted directories */
const generalDirectories = fs
  .readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(entity => entity.isDirectory())
  .map(dir => dir.name)
  .filter(
    name =>
      name !== 'api' &&
      name !== 'versions' &&
      ![
        ...homeDirectories,
        ...archiveDirectories,
        ...referenceDirectories,
        ...learnDirectories,
        ...previewDirectories,
      ].includes(name)
  );

// --- Navigation ---

const home = [
  makeSection('Get started', [
    makePage('get-started/introduction.mdx'),
    makePage('get-started/create-a-project.mdx'),
    makePage('get-started/set-up-your-environment.mdx'),
    makePage('get-started/start-developing.mdx'),
    makePage('get-started/next-steps.mdx'),
  ]),
  makeSection('Develop', [
    makePage('develop/tools.mdx'),
    makeGroup(
      'Navigation',
      [
        makePage('develop/file-based-routing.mdx'),
        makePage('develop/dynamic-routes.mdx'),
        makePage('develop/next-steps.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'User interface',
      [
        makePage('develop/user-interface/splash-screen-and-app-icon.mdx'),
        makePage('develop/user-interface/safe-areas.mdx'),
        makePage('develop/user-interface/fonts.mdx'),
        makePage('develop/user-interface/assets.mdx'),
        makePage('develop/user-interface/color-themes.mdx'),
        makePage('develop/user-interface/animation.mdx'),
        makePage('develop/user-interface/store-data.mdx'),
        makePage('develop/user-interface/next-steps.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Development builds',
      [
        makePage('develop/development-builds/introduction.mdx'),
        makePage('develop/development-builds/create-a-build.mdx'),
        makePage('develop/development-builds/use-development-builds.mdx'),
        makePage('develop/development-builds/share-with-your-team.mdx'),
        makePage('develop/development-builds/development-workflows.mdx'),
        makePage('develop/development-builds/next-steps.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Config plugins',
      [
        makePage('config-plugins/introduction.mdx'),
        makePage('config-plugins/plugins-and-mods.mdx'),
        makePage('config-plugins/development-and-debugging.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Debugging',
      [
        makePage('debugging/errors-and-warnings.mdx'),
        makePage('debugging/runtime-issues.mdx'),
        makePage('debugging/tools.mdx'),
        makePage('debugging/devtools-plugins.mdx'),
        makePage('debugging/create-devtools-plugins.mdx'),
      ],
      { expanded: false }
    ),
    makePage('develop/authentication.mdx'),
    makePage('develop/unit-testing.mdx'),
  ]),
  makeSection('Review', [makePage('review/overview.mdx'), makePage('review/with-orbit.mdx')]),
  makeSection('Deploy', [
    makePage('deploy/build-project.mdx'),
    makePage('deploy/submit-to-app-stores.mdx'),
    makePage('deploy/app-stores-metadata.mdx'),
    makePage('deploy/instant-updates.mdx'),
  ]),
  makeSection('More', [makePage('core-concepts.mdx'), makePage('faq.mdx')]),
];

const general = [
  makeSection('', [makePage('guides/overview.mdx')]),
  makeSection('Development process', [
    makePage('workflow/overview.mdx'),
    makePage('workflow/configuration.mdx'),
    makePage('guides/local-app-development.mdx'),
    makePage('workflow/using-libraries.mdx'),
    makePage('guides/apple-privacy.mdx'),
    makePage('guides/permissions.mdx'),
    makePage('guides/environment-variables.mdx'),
    makePage('guides/linking.mdx'),
    makePage('guides/deep-linking.mdx'),
    makeGroup(
      'Custom native code',
      [
        makePage('workflow/continuous-native-generation.mdx'),
        makePage('workflow/customizing.mdx'),
        makePage('workflow/prebuild.mdx'),
        makePage('guides/adopting-prebuild.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Web',
      [
        makePage('workflow/web.mdx'),
        makePage('distribution/publishing-websites.mdx'),
        makePage('guides/progressive-web-apps.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Bundling',
      [
        makePage('guides/customizing-metro.mdx'),
        makePage('guides/analyzing-bundles.mdx'),
        makePage('guides/tree-shaking.mdx'),
        makePage('guides/minify.mdx'),
      ],
      { expanded: false }
    ),
    makeSection('Existing React Native apps', [
      makePage('bare/overview.mdx'),
      makePage('bare/installing-expo-modules.mdx'),
      makePage('bare/using-expo-cli.mdx'),
      makePage('bare/installing-updates.mdx'),
      makePage('bare/install-dev-builds-in-bare.mdx'),
      makePage('bare/upgrade.mdx'),
    ]),
    makeSection('Existing native apps', [
      makePage('brownfield/overview.mdx'),
      makePage('brownfield/installing-expo-modules.mdx'),
    ]),
    makeGroup(
      'Reference',
      [
        makePage('guides/monorepos.mdx'),
        makePage('workflow/logging.mdx'),
        makePage('workflow/development-mode.mdx'),
        makePage('workflow/common-development-errors.mdx'),
        makePage('workflow/android-studio-emulator.mdx'),
        makePage('workflow/ios-simulator.mdx'),
        makePage('guides/new-architecture.mdx'),
      ],
      { expanded: false }
    ),
  ]),
  makeSection('Expo Router', [
    makePage('router/introduction.mdx'),
    makePage('router/installation.mdx'),
    makePage('router/create-pages.mdx'),
    makePage('router/navigating-pages.mdx'),
    makePage('router/layouts.mdx'),
    makePage('router/appearance.mdx'),
    makePage('router/error-handling.mdx'),
    makeGroup('Navigation patterns', [
      makePage('router/advanced/root-layout.mdx'),
      makePage('router/advanced/stack.mdx'),
      makePage('router/advanced/tabs.mdx'),
      makePage('router/advanced/drawer.mdx'),
      makePage('router/advanced/nesting-navigators.mdx'),
      makePage('router/advanced/modals.mdx'),
      makePage('router/advanced/shared-routes.mdx'),
    ]),
    makeGroup('Advanced', [
      makePage('router/advanced/platform-specific-modules.mdx'),
      makePage('router/advanced/native-intent.mdx'),
      makePage('router/advanced/router-settings.mdx'),
      makePage('router/advanced/apple-handoff.mdx'),
    ]),
    makeGroup('Reference', [
      makePage('router/reference/hooks.mdx'),
      makePage('router/reference/url-parameters.mdx'),
      makePage('router/reference/redirects.mdx'),
      makePage('router/reference/static-rendering.mdx'),
      makePage('router/reference/async-routes.mdx'),
      makePage('router/reference/api-routes.mdx'),
      makePage('router/reference/sitemap.mdx'),
      makePage('router/reference/typed-routes.mdx'),
      makePage('router/reference/authentication.mdx'),
      makePage('router/reference/not-found.mdx'),
      makePage('router/reference/screen-tracking.mdx'),
      makePage('router/reference/src-directory.mdx'),
      makePage('router/reference/testing.mdx'),
      makePage('router/reference/troubleshooting.mdx'),
      makePage('router/reference/faq.mdx'),
    ]),
    makeGroup('Migration', [
      makePage('router/migrate/from-react-navigation.mdx'),
      makePage('router/migrate/from-expo-webpack.mdx'),
    ]),
  ]),
  makeSection(
    'Expo Modules API',
    [
      makePage('modules/overview.mdx'),
      makePage('modules/get-started.mdx'),
      makeSection('Tutorials', [
        makePage('modules/native-module-tutorial.mdx'),
        makePage('modules/native-view-tutorial.mdx'),
        makePage('modules/config-plugin-and-native-module-tutorial.mdx'),
        makePage('modules/use-standalone-expo-module-in-your-project.mdx'),
        makePage('modules/third-party-library.mdx'),
        makePage('modules/existing-library.mdx'),
        makePage('modules/additional-platform-support.mdx'),
      ]),
      makeSection('Reference', [
        makePage('modules/module-api.mdx'),
        makePage('modules/android-lifecycle-listeners.mdx'),
        makePage('modules/appdelegate-subscribers.mdx'),
        makePage('modules/autolinking.mdx'),
        makePage('modules/module-config.mdx'),
        makePage('modules/mocking.mdx'),
      ]),
    ],
    { expanded: false }
  ),
  makeSection('EAS', [makePage('eas/index.mdx'), makePage('eas/json.mdx')]),
  makeSection('EAS Build', [
    makePage('build/introduction.mdx'),
    makePage('build/setup.mdx'),
    makePage('build/eas-json.mdx'),
    makePage('build/internal-distribution.mdx'),
    makePage('build/automate-submissions.mdx'),
    makePage('build/updates.mdx'),
    makePage('build/building-on-ci.mdx'),
    makePage('build/building-from-github.mdx'),
    makePage('build/orbit.mdx'),
    makeGroup(
      'App Signing',
      [
        makePage('app-signing/app-credentials.mdx'),
        makePage('app-signing/managed-credentials.mdx'),
        makePage('app-signing/local-credentials.mdx'),
        makePage('app-signing/existing-credentials.mdx'),
        makePage('app-signing/syncing-credentials.mdx'),
        makePage('app-signing/security.mdx'),
        makePage('app-signing/apple-developer-program-roles-and-permissions.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Custom builds',
      [
        makePage('custom-builds/get-started.mdx'),
        makePage('custom-builds/schema.mdx'),
        makePage('custom-builds/functions.mdx'),
      ],
      { expanded: false }
    ),
    makeGroup(
      'Reference',
      [
        makePage('build-reference/npm-hooks.mdx'),
        makePage('build-reference/private-npm-packages.mdx'),
        makePage('build-reference/git-submodules.mdx'),
        makePage('build-reference/npm-cache-with-yarn.mdx'),
        makePage('build-reference/build-with-monorepos.mdx'),
        makePage('build-reference/variables.mdx'),
        makePage('build-reference/apk.mdx'),
        makePage('build-reference/simulators.mdx'),
        makePage('build-reference/app-versions.mdx'),
        makePage('build-reference/troubleshooting.mdx'),
        makePage('build-reference/variants.mdx'),
        makePage('build-reference/ios-capabilities.mdx'),
        makePage('build-reference/local-builds.mdx'),
        makePage('build-reference/caching.mdx'),
        makePage('build-reference/android-builds.mdx'),
        makePage('build-reference/ios-builds.mdx'),
        makePage('build-reference/build-configuration.mdx'),
        makePage('build-reference/infrastructure.mdx'),
        makePage('build-reference/app-extensions.mdx'),
        makePage('build-reference/e2e-tests.mdx'),
        makePage('build-reference/limitations.mdx'),
      ],
      { expanded: false }
    ),
  ]),
  makeSection('EAS Submit', [
    makePage('submit/introduction.mdx'),
    makePage('submit/eas-json.mdx'),
    makePage('submit/android.mdx'),
    makePage('submit/ios.mdx'),
  ]),
  makeSection('EAS Update', [
    makePage('eas-update/introduction.mdx'),
    makePage('eas-update/getting-started.mdx'),
    makePage('eas-update/publish.mdx'),
    makePage('eas-update/eas-cli.mdx'),
    makePage('eas-update/develop-faster.mdx'),
    makePage('eas-update/github-actions.mdx'),
    makePage('eas-update/faq.mdx'),
    makeGroup('Concepts', [
      makePage('eas-update/how-it-works.mdx'),
      makePage('eas-update/runtime-versions.mdx'),
      makePage('eas-update/deployment-patterns.mdx'),
    ]),
    makeGroup('Troubleshoot', [
      makePage('eas-update/debug.mdx'),
      makePage('eas-update/debug-advanced.mdx'),
      makePage('eas-update/expo-dev-client.mdx'),
      makePage('eas-update/build-locally.mdx'),
      makePage('eas-update/error-recovery.mdx'),
    ]),
    makeGroup('Advanced', [
      makePage('eas-update/optimize-assets.mdx'),
      makePage('eas-update/environment-variables.mdx'),
      makePage('eas-update/code-signing.mdx'),
      makePage('eas-update/rollouts.mdx'),
      makePage('eas-update/rollbacks.mdx'),
      makePage('eas-update/asset-selection.mdx'),
      makePage('eas-update/continuous-deployment.mdx'),
    ]),
    makeGroup('Reference', [
      makePage('eas-update/migrate-from-classic-updates.mdx'),
      makePage('eas-update/codepush.mdx'),
      makePage('eas-update/updating-your-app.mdx'),
    ]),
  ]),
  makeSection('EAS Metadata', [
    makePage('eas/metadata/index.mdx'),
    makePage('eas/metadata/getting-started.mdx'),
    makeGroup(
      'Reference',
      [
        makePage('eas/metadata/config.mdx'),
        makePage('eas/metadata/schema.mdx'),
        makePage('eas/metadata/faq.mdx'),
      ],
      { expanded: false }
    ),
  ]),
  makeSection('EAS Insights', [makePage('eas-insights/introduction.mdx')]),
  makeSection('Push notifications', [
    makePage('push-notifications/overview.mdx'),
    makePage('push-notifications/push-notifications-setup.mdx'),
    makePage('push-notifications/sending-notifications.mdx'),
    makePage('push-notifications/receiving-notifications.mdx'),
    makePage('push-notifications/fcm-credentials.mdx'),
    makeGroup(
      'Reference',
      [
        makePage('push-notifications/obtaining-a-device-token-for-fcm-or-apns.mdx'),
        makePage('push-notifications/sending-notifications-custom.mdx'),
        makePage('push-notifications/sending-notifications-custom-fcm-legacy.mdx'),
        makePage('push-notifications/faq.mdx'),
      ],
      { expanded: false }
    ),
  ]),
  makeSection('Distribution', [
    makePage('distribution/introduction.mdx'),
    makePage('distribution/app-stores.mdx'),
    makePage('distribution/runtime-versions.mdx'),
    makePage('distribution/app-transfers.mdx'),
  ]),
  makeSection(
    'More',
    [
      makePage('workflow/upgrading-expo-sdk-walkthrough.mdx'),
      makePage('eas/webhooks.mdx'),
      makeSection('Assorted', [
        makePage('guides/authentication.mdx'),
        makePage('guides/sharing-preview-releases.mdx'),
        makePage('guides/using-hermes.mdx'),
        makePage('guides/ios-developer-mode.mdx'),
        makePage('guides/icons.mdx'),
        makePage('guides/localization.mdx'),
        makePage('guides/configuring-js-engines.mdx'),
        makePage('guides/using-bun.mdx'),
        makePage('guides/editing-richtext.mdx'),
        makePage('guides/store-assets.mdx'),
      ]),
      makeSection('Integrations', [
        makePage('guides/using-analytics.mdx'),
        makePage('guides/facebook-authentication.mdx'),
        makePage('guides/using-supabase.mdx'),
        makePage('guides/using-firebase.mdx'),
        makePage('guides/google-authentication.mdx'),
        makePage('guides/using-eslint.mdx'),
        makePage('guides/using-nextjs.mdx'),
        makePage('guides/using-sentry.mdx'),
        makePage('guides/using-bugsnag.mdx'),
        makePage('guides/building-for-tv.mdx'),
        makePage('guides/typescript.mdx'),
        makePage('guides/in-app-purchases.mdx'),
      ]),
      makeSection('Expo accounts', [
        makePage('accounts/account-types.mdx'),
        makePage('accounts/two-factor.mdx'),
        makePage('accounts/programmatic-access.mdx'),
        makePage('accounts/sso.mdx'),
      ]),
      makeSection('Billing', [
        makePage('billing/overview.mdx'),
        makePage('billing/plans.mdx'),
        makePage('billing/manage.mdx'),
        makePage('billing/invoices-and-receipts.mdx'),
        makePage('billing/usage-based-pricing.mdx'),
        makePage('billing/faq.mdx'),
      ]),
      makeSection('Troubleshooting', [
        makePage('troubleshooting/overview.mdx'),
        makePage('troubleshooting/application-has-not-been-registered.mdx'),
        makePage('troubleshooting/clear-cache-macos-linux.mdx'),
        makePage('troubleshooting/clear-cache-windows.mdx'),
        makePage('troubleshooting/react-native-version-mismatch.mdx'),
        makePage('troubleshooting/proxies.mdx'),
      ]),
    ],
    { expanded: true }
  ),
  makeSection('Regulatory compliance', [
    makePage('regulatory-compliance/data-and-privacy-protection.mdx'),
    makePage('regulatory-compliance/gdpr.mdx'),
    makePage('regulatory-compliance/hipaa.mdx'),
    makePage('regulatory-compliance/privacy-shield.mdx'),
  ]),
];

const learn = [
  makeSection('', [makePage('tutorial/overview.mdx')]),
  makeSection(
    'Get started',
    [
      makePage('tutorial/introduction.mdx'),
      makePage('tutorial/create-your-first-app.mdx'),
      makePage('tutorial/build-a-screen.mdx'),
      makePage('tutorial/image-picker.mdx'),
      makePage('tutorial/create-a-modal.mdx'),
      makePage('tutorial/gestures.mdx'),
      makePage('tutorial/screenshot.mdx'),
      makePage('tutorial/platform-differences.mdx'),
      makePage('tutorial/configuration.mdx'),
      makePage('tutorial/follow-up.mdx'),
    ],
    { expanded: true }
  ),
  makeSection(
    'EAS tutorial',
    [
      makePage('tutorial/eas/introduction.mdx'),
      makePage('tutorial/eas/configure-development-build.mdx'),
      makePage('tutorial/eas/android-development-build.mdx'),
      makePage('tutorial/eas/ios-development-build-for-simulators.mdx'),
      makePage('tutorial/eas/ios-development-build-for-devices.mdx'),
      makePage('tutorial/eas/multiple-app-variants.mdx'),
      makePage('tutorial/eas/internal-distribution-builds.mdx'),
      makePage('tutorial/eas/manage-app-versions.mdx'),
      makePage('tutorial/eas/android-production-build.mdx'),
      makePage('tutorial/eas/ios-production-build.mdx'),
      makePage('tutorial/eas/team-development.mdx'),
      makePage('tutorial/eas/using-github.mdx'),
      makePage('tutorial/eas/next-steps.mdx'),
    ],
    { expanded: true }
  ),
  makeSection(
    'UI programming',
    [
      makePage('ui-programming/image-background.mdx'),
      makePage('ui-programming/implementing-a-checkbox.mdx'),
      makePage('ui-programming/z-index.mdx'),
      makePage('ui-programming/using-svgs.mdx'),
      makePage('ui-programming/react-native-toast.mdx'),
      makePage('ui-programming/react-native-styling-buttons.mdx'),
      makePage('ui-programming/user-interface-libraries.mdx'),
    ],
    { expanded: true }
  ),
  makeSection('More', [makePage('additional-resources/index.mdx')]),
];

const preview = [
  makeSection('Preview', [
    makePage('preview/introduction.mdx'),
    makePage('preview/react-compiler.mdx'),
    { expanded: true },
  ]),
];

const archive = [
  makeSection('Classic Builds', [
    makePage('archive/classic-builds/building-standalone-apps.mdx'),
    makePage('archive/classic-builds/turtle-cli.mdx'),
    makePage('archive/classic-builds/migrating.mdx'),
  ]),
  makeSection('Classic Updates', [
    makePage('archive/classic-updates/introduction.mdx'),
    makeSection('Guides', [
      makePage('archive/classic-updates/configuring-updates.mdx'),
      makePage('archive/classic-updates/preloading-and-caching-assets.mdx'),
    ]),
    makeSection('Distribution', [
      makePage('archive/classic-updates/release-channels.mdx'),
      makePage('archive/classic-updates/advanced-release-channels.mdx'),
      makePage('archive/classic-updates/hosting-your-app.mdx'),
      makePage('archive/classic-updates/offline-support.mdx'),
      makePage('archive/classic-updates/optimizing-updates.mdx'),
    ]),
    makeSection('Workflow', [makePage('archive/classic-updates/publishing.mdx')]),
    makeSection('Bare Workflow', [makePage('archive/classic-updates/updating-your-app.mdx')]),
  ]),
  makeSection('Technical Specs', [makePage('archive/technical-specs/expo-updates-0.mdx')]),
  makeSection('More', [
    makePage('archive/expo-cli.mdx'),
    makePage('archive/managed-vs-bare.mdx'),
    makePage('archive/notification-channels.mdx'),
    makePage('archive/publishing-websites-webpack.mdx'),
    makePage('archive/customizing-webpack.mdx'),
    makePage('archive/using-expo-client.mdx'),
    makePage('archive/using-flipper.mdx'),
    makePage('archive/e2e-tests.mdx'),
    makePage('archive/glossary.mdx'),
  ]),
];

const featurePreview = [];

const versionsReference = VERSIONS.reduce(
  (all, version) => ({
    ...all,
    [version]: [
      makeSection('Configuration files', pagesFromDir(`versions/${version}/config`), {
        expanded: true,
      }),
      makeSection(
        'Expo SDK',
        shiftEntryToFront(pagesFromDir(`versions/${version}/sdk`), entry => entry.name === 'Expo'),
        { expanded: true }
      ),
      makeSection('Technical specs', [
        makePage('technical-specs/expo-updates-1.mdx'),
        makePage('technical-specs/expo-sfv-0.mdx'),
      ]),
      makeSection(
        'More',
        [
          makePage('more/expo-cli.mdx'),
          makePage('more/create-expo.mdx'),
          makePage('more/qr-codes.mdx'),
          makePage('more/glossary-of-terms.mdx'),
        ],
        {
          expanded: true,
        }
      ),
      makeSection(
        'React Native',
        [
          make('page', {
            href: 'https://reactnative.dev/docs/components-and-apis',
            sidebarTitle: 'Visit documentation',
          }),
        ],
        { expanded: true }
      ),
    ],
  }),
  {}
);

const reference = { ...versionsReference, latest: versionsReference['latest'] };

export default {
  home,
  general,
  learn,
  preview,
  archive,
  featurePreview,
  reference,
  generalDirectories,
  previewDirectories,
  referenceDirectories,
  archiveDirectories,
  homeDirectories,
  learnDirectories,
};

// --- MDX methods ---

function makeSection(name, children = [], props = {}) {
  return make('section', { name, ...{ expanded: false, ...props } }, children);
}

function makeGroup(name, children = [], props = {}) {
  return make('group', { name, ...props }, children);
}

/**
 * Parse the MDX page and extract the frontmatter/yaml page information.
 * It will only look for the frontmatter/yaml block in the root nodes.
 * This requires the `remark-frontmatter` MDX plugin.
 *
 * @param {string} file
 */
function makePage(file) {
  const filePath = path.resolve(PAGES_DIR, file);
  const contents = fs.readFileSync(filePath, 'utf-8');
  const url = pageUrl(filePath);
  const data = frontmatter(contents).attributes;

  if (!data) {
    console.error('Page YAML block is unreadable:', file);
  } else if (!data.title) {
    console.error('Page does not have a `title`:', file);
    data.title = '';
  }

  const result = {
    // TODO(cedric): refactor name into title
    name: data.title,
    // TODO(cedric): refactor href into url
    href: url,
  };
  // TODO(cedric): refactor sidebarTitle into metadata
  if (data.sidebar_title) {
    result.sidebarTitle = data.sidebar_title;
  }
  // TODO(cedric): refactor hidden into `isHidden` and move it to metadata
  if (data.hidden) {
    result.hidden = data.hidden;
  }
  return make('page', result);
}

// --- Other helpers ---

/**
 * Load all pages from a single directory.
 */
function pagesFromDir(dir) {
  return fs
    .readdirSync(path.resolve(PAGES_DIR, dir), { withFileTypes: true })
    .filter(entity => entity.isFile())
    .map(file => makePage(path.join(dir, file.name)));
}

/**
 * Create the page url using the absolute file path.
 * This parses the URL, relatively from PAGES_DIR.
 * It also strips the file extension, and name if its `index`.
 * These urls are pathnames, without trailing slashes.
 */
function pageUrl(file) {
  const filePath = path.parse(file);
  const { pathname } = new URL(path.relative(PAGES_DIR, file), 'https://docs.expo.dev');
  return pathname
    .replace(filePath.base, filePath.name === 'index' ? '' : filePath.name)
    .replace(/\/$/, '');
}

function shiftEntryToFront(array, findFunction) {
  return [...array.filter(findFunction), ...array.filter(item => !findFunction(item))];
}
