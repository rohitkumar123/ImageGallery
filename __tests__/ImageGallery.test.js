import React from 'react';
import {ActivityIndicator, FlatList, View, Text, Image} from 'react-native';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import ImageGallery from '../src/components/ImageGallery';
import styles from '../src/components/styles';
import {IMAGE_URL} from '../src/utils';

jest.mock('axios');
jest.mock('react-redux');
jest.mock('@react-native-community/netinfo', () => ({
  fetch: () => Promise.resolve(jest.fn()),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <ImageGallery />
      </Provider>,
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
it('renders correctly', () => {
  const tree = renderer.create(<ImageGallery />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the ActivityIndicator component', () => {
  const tree = renderer
    .create(<ActivityIndicator animating={true} size="large" color="#0000ff" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the FlatList component', () => {
  const tree = renderer
    .create(
      <FlatList
        refreshing={true}
        onRefresh={() => {}}
        data={[
          {
            format: 'jpeg',
            width: 5616,
            height: 3744,
            filename: '0.jpeg',
            id: 0,
            author: 'Alejandro Escamilla',
            author_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
            post_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
          },
          {
            format: 'jpeg',
            width: 5616,
            height: 3744,
            filename: '1.jpeg',
            id: 1,
            author: 'Alejandro Escamilla',
            author_url: 'https://unsplash.com/photos/LNRyGwIJr5c',
            post_url: 'https://unsplash.com/photos/LNRyGwIJr5c',
          },
        ]}
        keyExtractor={(item) => `key-${item.id}`}
        renderItem={({item}) => {
          const {author, id} = item;
          return (
            <View style={styles.item}>
              <Text style={styles.title}>{author}</Text>
              <Image
                style={styles.image}
                source={{
                  uri: IMAGE_URL(id),
                }}
              />
            </View>
          );
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
