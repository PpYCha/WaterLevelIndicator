import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';
import React, {useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    body: 'BARANGAY YAKAL WATER LEVEL INDICATOR   Water Level Alert!!! Mag aktibar, tighataas an tubig sa Brgy. Yakal apiki sa sapa tungod sa pag baha   Estimated water height: 3-4 meters',
    timestamp: '1575909015000',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    body: 'BARANGAY YAKAL WATER LEVEL INDICATOR   Water Level Alert!!! Mag aktibar, tighataas an tubig sa Brgy. Yakal apiki sa sapa tungod sa pag baha   Estimated water height: 3-4 meters',
    timestamp: '1575909015000',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    body: 'BARANGAY YAKAL WATER LEVEL INDICATOR   Water Level Alert!!! Mag aktibar, tighataas an tubig sa Brgy. Yakal apiki sa sapa tungod sa pag baha   Estimated water height: 3-4 meters',
    timestamp: '1575909015000',
  },
];

const HomeScreen = ({navigation}) => {
  const [textMessage, setTextMessage] = useState('');
  const [date, setDate] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const {logout} = useContext(AuthContext);
  const [dataList, setDataList] = useState();
  const isFocused = useIsFocused();

  const renderItem = ({item}) => {
    // console.log('item', item.created.toDate().toLocaleString());

    const aa = item.created;

    const milliseconds = aa * 1000; // 1575909015000

    const dateObject = new Date(milliseconds);

    const humanDateFormat = dateObject.toLocaleString().slice(0, -4); //2019-12-9 10:30:15

    return (
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        {/* <Text style={styles.title}>{item.body}</Text> */}
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{humanDateFormat}</Text>
          <Button
            title="X"
            onPress={() => {
              handleDelete(item.id);
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleDelete = async id => {
    await firestore()
      .collection('message')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Time deleted!');
        getData();
      });
  };

  useEffect(() => {
    getData();
    const subscribe = SmsListener.addListener(message => {
      setLoading(false);

      const milliseconds = message.timestamp * 1000; // 1575909015000

      const dateObject = new Date(milliseconds);

      const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
      setDate(humanDateFormat.slice(0, -4));

      setTextMessage(message.body);

      saveText();
      getData();
      setLoading(true);
    });

    return () => subscribe.remove();
  }, [isFocused]);

  const getData = async () => {
    try {
      const list = [];
      await firestore()
        .collection('message')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const id = doc.id;

            const {body, date, created} = doc.data();
            list.push({
              id,
              body,
              date,
              created,
            });
          });
        });
      setDataList(list);
    } catch (e) {
      console.log('getData error: ', e);
    }
  };

  const getText = async () => {
    const subscription = await SmsListener.addListener(message => {
      const milliseconds = message.timestamp * 1000; // 1575909015000

      const dateObject = new Date(milliseconds);

      const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
      setDate(humanDateFormat.slice(0, -4));

      setTextMessage(message.body);

      if (
        typeof textMessage === 'undefined' ? console.log('subs: ') : saveText()
      );
      subscription.remove();
    });
  };

  const saveText = async () => {
    await firestore()
      .collection('message')
      .doc()
      .set({
        body: textMessage,
        date: date,
        created: firestore.FieldValue.serverTimestamp(),
        // originatingAddress: textMessage.originatingAddress,
      })
      .catch(error => {
        console.log(
          'Something went wrong with added user to firestore: ',
          error,
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>{textMessage}</Text>

        <Text style={styles.text}>Date: {date}</Text>
      </View>
      {loading ? (
        <>
          <Text style={styles.record}>Record:</Text>
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </>
      ) : (
        <></>
      )}

      <CustomButton buttonTitle="Logout" onPress={() => logout()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    color: 'black',
  },
  messageContainer: {
    backgroundColor: 'gray',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    color: 'white',
  },
  record: {
    fontSize: 30,
    fontWeight: '500',
    margin: 10,
    padding: 10,
  },
});

export default HomeScreen;
