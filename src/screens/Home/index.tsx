import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/background';
import { GameCard, GameCardProps } from '../../components/gameCard';
import { Heading } from '../../components/heading';

import { styles } from './styles';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    fetch('http://192.168.0.16:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  function handleOpenGame({id, title, bannerUrl} : GameCardProps) {
    navigation.navigate('game', {
      id,
      title,
      bannerUrl,
    })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
        />

      </SafeAreaView>
    </Background>
  );
}