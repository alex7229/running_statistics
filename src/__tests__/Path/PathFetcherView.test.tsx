import * as React from 'react';
import { shallow } from 'enzyme';
import { PathFetcherView } from '../../Path/PathFetcherView';
import { PathInformation } from '../../Path/PathInformation';

describe('should render path component correctly', () => {

  it('should render button if geo was not started. Button should start watcher', () => {
    const initWatcherMock = jest.fn();
    const wrapper = shallow(
      <PathFetcherView
        getPath={jest.fn()}
        getSpeed={jest.fn()}
        path={[]}
        initWatcher={initWatcherMock}
        stopWatcher={jest.fn()}
        geoLocationStarted={false}
        toLocaleTime={jest.fn()}
      />
    );
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(1);
    buttons.simulate('click');
    expect(initWatcherMock.mock.calls.length).toBe(1);
  });

  it('should render button and notification if no positions were fetched. Button should stop watcher', () => {
    const stopWatcherMock = jest.fn();
    const wrapper = shallow(
      <PathFetcherView
        getPath={jest.fn()}
        getSpeed={jest.fn()}
        path={[]}
        initWatcher={jest.fn()}
        stopWatcher={stopWatcherMock}
        geoLocationStarted={true}
        toLocaleTime={jest.fn()}
      />
    );
    const notification = <div>geo location is initializing</div>;
    expect(wrapper.contains(notification)).toBe(true);
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(1);
    buttons.simulate('click');
    expect(stopWatcherMock.mock.calls.length).toBe(1);
  });

  it('should render stop button if positions were fetched. Button should stop watcher', () => {
    const path = [
      { latitude: 25, longitude: 32, time: 234234243 },
      { latitude: 42, longitude: 23, time: 23232323 }
    ];
    const stopWatcherMock = jest.fn();
    const wrapper = shallow(
      <PathFetcherView
        getPath={jest.fn()}
        getSpeed={jest.fn()}
        path={path}
        initWatcher={jest.fn()}
        stopWatcher={stopWatcherMock}
        geoLocationStarted={true}
        toLocaleTime={jest.fn()}
      />
    );
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(1);
    buttons.simulate('click');
    expect(stopWatcherMock.mock.calls.length).toBe(1);
  });

  it('should display path information correctly with only one position', () => {
    const path = [{ latitude: 25, longitude: 44, time: 2342432 }];
    const getPathMock = jest.fn();
    const getSpeedMock = jest.fn();
    const toLocaleTimeMock = jest.fn();
    const wrapper = shallow(
      <PathFetcherView
        path={path}
        initWatcher={jest.fn()}
        stopWatcher={jest.fn()}
        getPath={getPathMock}
        getSpeed={getSpeedMock}
        geoLocationStarted={true}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(getPathMock.mock.calls.length).toBe(0);
    expect(getSpeedMock.mock.calls.length).toBe(0);
    const pathInformation = (
      <PathInformation
        latitude={25}
        longitude={44}
        time={2342432}
        totalDistance={0}
        avgSpeed={0}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(wrapper.contains(pathInformation)).toBe(true);
  });

  it('should display path information correctly with 2 or more positions', () => {
    const path = [
      { latitude: 25, longitude: 32, time: 234234243 },
      { latitude: 42, longitude: 23, time: 232323235 },
      { latitude: 48, longitude: -17, time: 23456553 }
    ];
    const getPathMock = jest.fn();
    getPathMock.mockReturnValue(1458);
    const getSpeedMock = jest.fn();
    getSpeedMock.mockReturnValue(220);
    const toLocaleTimeMock = jest.fn();
    const wrapper = shallow(
      <PathFetcherView
        getPath={getPathMock}
        getSpeed={getSpeedMock}
        path={path}
        initWatcher={jest.fn()}
        stopWatcher={jest.fn()}
        geoLocationStarted={true}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(getPathMock.mock.calls.length).toBe(1);
    expect(getPathMock.mock.calls[0][0]).toBe(path);
    expect(getSpeedMock.mock.calls.length).toBe(1);
    expect(getSpeedMock.mock.calls[0][0]).toBe(path);
    const pathInformation = (
      <PathInformation
        latitude={48}
        longitude={-17}
        time={23456553}
        totalDistance={1458}
        avgSpeed={220}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(wrapper.contains(pathInformation)).toBe(true);

  });

});