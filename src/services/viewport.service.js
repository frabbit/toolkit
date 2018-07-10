import { BehaviorSubject, Observable, Subject, fromEvent } from 'rxjs';

export const MEDIA_QUERY_TYPES_FOUNDATION = [
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge'];
export const MEDIA_QUERY_TYPES_BOOTSTRAP = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl'];

/**
 * viewport service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
export class ViewportService {
  /**
   * constructor
   */
  constructor (mediaQueryTypes = MEDIA_QUERY_TYPES_FOUNDATION) {
    this.scope = global || window;
    this.isBrowser = typeof document === 'object';
    this.document = this.isBrowser ? document : null;
    this.rootNode = this.scope;
    this.bodyNode = this.isBrowser ? document.body : null;

    if (this.isBrowser) {
      // regist all vieport observer
      this.onResize = fromEvent(this.scope, 'resize');
      this.onVisiblityChange = fromEvent(
        this.scope,
        'visibilitychange',
        event => !this.document.hidden,
      );

      // scrolling observer
      this.onScroll = fromEvent(this.rootNode, 'scroll');
      this.onScrollTop = new BehaviorSubject(this.scrollTop);

      this.onScroll.subscribe(event => {
        this.onScrollTop.next(this.scrollTop);
      });

      // delete observer
      this.onDestory = fromEvent(this.rootNode, 'beforeunload');

      // init scroll top value
      this.scrollTop = this.scrollTop;

      // init media query listeners
      this.initMediaMatcher(mediaQueryTypes);
    }
    else {
      const subjects = [
        'onResize',
        'onVisiblityChange',
        'onScroll',
        'onScrollTop',
        'onDestory',
        'onMediaQuery'
      ];
      subjects.forEach(name => {
        this[name] = new Subject();
      });
    }
  }

  /**
   * init
   */
  initMediaMatcher (mediaQueryTypes) {
    this.mediaQueryTypes = mediaQueryTypes;
    const firstMediaQueryType = this.mediaQueryTypes[0];

    // clean old media matcher set
    if (this.mediaMatcher) {
      Object.keys(this.mediaMatcher).
        forEach(matcher => matcher.removeListener());

      this.onMediaQuery.next(firstMediaQueryType);
    }
    else {
      this.onMediaQuery = new BehaviorSubject(firstMediaQueryType);
    }

    this.mediaMatcher = {};

    this.mediaQueryTypes.forEach(name => {
      const metaNode = document.querySelector(`meta[name="media:${name}"]`);
      if (metaNode) {
        const style = getComputedStyle(metaNode);
        let mediaQueryString = String(style.fontFamily);
        mediaQueryString = mediaQueryString.substr(1, mediaQueryString.length -
          2); // trim "
        const matcher = this.scope.matchMedia(mediaQueryString);

        if (matcher.matches) {
          // predefine right value
          this.onMediaQuery.next(name);
        }

        // save matcher
        this.mediaMatcher[name] = matcher;
        matcher.addListener(mq => {
          // resolve the name if this is the current breakpoint
          if (mq.matches) {
            this.onMediaQuery.next(name);
          }
        });
      }
    });
  }

  /**
   * getter property scroll top, offset to screen top position
   *
   * @returns {Number}
   */
  get scrollTop () {
    if (this.isBrowser) {
      return this.scope.pageYOffset || document.documentElement.scrollTop ||
        this.bodyNode.scrollTop || 0;
    }
    return 0;
  }

  /**
   * setter property scroll top, set the offset to top position
   *
   * @param {Number} value
   */
  set scrollTop (value) {
    if (this.isBrowser) {
      if (document.documentElement) {
        document.documentElement.scrollTop = value;
      }

      this.bodyNode.scrollTop = value;
    }
  }

  /**
   * get size of screen view
   *
   * @returns {{width: number, height: number}}
   */
  get size () {
    if (this.isBrowser) {
      return {
        width: Math.max(
          document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(
          document.documentElement.clientHeight, window.innerHeight || 0),
      };
    }
    return { width: 0, height: 0 };
  }
}
