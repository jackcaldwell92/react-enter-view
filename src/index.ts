import * as React from 'react';

interface IProps {
  onEnterView: () => void;
  onExitView: () => void;
  throttle: number;
}

export class Monitor extends React.Component<IProps> {
  public static defaultProps = {
    onEnterView: () => null,
    onExitView: () => null,
    throttle: 100,
  };

  public canUpdate = true;

  public state = {
    inView: false,
  };

  private childrenRef = React.createRef<HTMLDivElement>();

  private children = React.cloneElement(
    this.props.children as React.ReactElement<any>,
    {
      ref: this.childrenRef,
    },
  );

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // Check if child node is already in view.
    const inView = this.checkInView();
    if (inView) {
      this.setState({ inView: true });
      this.props.onEnterView();
    }
  }

  public render() {
    return this.children;
  }

  private handleScroll = () => {
    if (this.canUpdate) {
      const inView = this.checkInView();
      if (inView !== this.state.inView) {
        this.setState({ inView });
        if (inView) {
          this.props.onEnterView();
        } else {
          this.props.onExitView();
        }
      }
      this.canUpdate = false;
      setTimeout(() => (this.canUpdate = true), this.props.throttle);
    }
  };

  private checkInView = () => {
    if (this.childrenRef.current) {
      if (
        window.scrollY + window.innerHeight >
          this.childrenRef.current.offsetTop &&
        window.scrollX + window.innerWidth >
          this.childrenRef.current.offsetLeft &&
        this.childrenRef.current.offsetTop +
          this.childrenRef.current.getBoundingClientRect().height >
          window.scrollY &&
        this.childrenRef.current.offsetLeft +
          this.childrenRef.current.getBoundingClientRect().width >
          window.scrollX
      ) {
        return true;
      }
    }
    return false;
  };
}
