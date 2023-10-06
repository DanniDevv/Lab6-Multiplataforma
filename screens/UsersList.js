import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { database } from '../database/firebase';
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { Card, IconButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [likesCount, setLikesCount] = useState({});

  useEffect(() => {
    const collectionRef = collection(database, 'usuarios');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          phone: doc.data().phone,
          image: doc.data().image || 'https://www.javiramosmarketing.com/wp-content/uploads/2016/10/publicdominepictures-banco-imagenes-gratis.jpg',
        }))
      );

      const likesCountObj = {};
      querySnapshot.docs.forEach((doc) => {
        likesCountObj[doc.id] = doc.data().likes || 0;
      });
      setLikesCount(likesCountObj);
    });

    return unsubscribe;
  }, []);

  const renderUserCard = (user) => (
    <Animatable.View key={user.id} animation="fadeInUp" duration={1000} style={styles.userCard}>
      <Card style={styles.cardContainer}>
        <Image source={{ uri: user.image }} style={styles.userImage} />
        <Card.Content>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.emailText}>Email: {user.email}</Text>
          <Text style={styles.phoneText}>Phone: {user.phone}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="thumb-up"
            onPress={() => handleLike(user.id)}
            color="#3498db"
          />
          <Text style={styles.likesCountText}>
            {likesCount[user.id]} Me gusta
          </Text>
        </Card.Actions>
      </Card>
    </Animatable.View>
  );

  const handleLike = async (userId) => {
    const currentLikes = likesCount[userId] || 0;
    const updatedLikes = currentLikes + 1;
    const userDocRef = doc(database, 'usuarios', userId);
    await updateDoc(userDocRef, { likes: updatedLikes });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {users.map(renderUserCard)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  userCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 10,
    width: '90%',
    elevation: 5, 
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  phoneText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
  userImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  likesCountText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#3498db',
  },
});

export default UsersList;
