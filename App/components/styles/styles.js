import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

// styles for the individual cards
const card = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    width: width * 0.3,
    justifyContent: 'center',
    marginLeft: width * 0.015,
    marginRight: width * 0.015,
    marginBottom: 1,
    borderRadius: 5,
  },
  val: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 32
  }
});

const create = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    margin: 12,
    marginBottom: 24
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height:32,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#333',
  },
  submitButton: {
    backgroundColor: '#555',
    color:'#fff',
    fontSize: 24,
    padding: 12
  },
  alert: {
    fontSize:24,
    color: 'red',
    textAlign: 'center',
  }
});

const game = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: width,
  },
  main: {
    flex: 3,
    width: width * 1,
    justifyContent: 'center',
  },
  hand: {
    flex: 1,
    width: width,
    backgroundColor: '#fff'
  },
  label: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 72
  },
  optional: {
    justifyContent: 'center',
    margin: width * 0.1,
  }
});

const login = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    margin: 12,
    marginBottom: 24
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  labels: {
    paddingBottom: 12,
  },
  input: {
    height:32,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#333',
    borderWidth: 1,
    borderColor: '#333',
  },
  submitButton: {
    backgroundColor: '#555',
    color:'#fff',
    fontSize: 24,
    padding: 12,
    margin: 12,
  },
  alert: {
    fontSize:24,
    color: 'red',
    textAlign: 'center',
  }
});

const openGames = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    flex: 0.15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gameList: {
    flex: 1,
  }
});

const popup = StyleSheet.create({
  top: {
    height: height * 0.33,
    width: width * 0.66,
    backgroundColor: '#333',
    opacity: 0.7,
    position: 'absolute',
    top: height * 0.2,
    left: width * (0.33/2),
    zIndex: 100,
    padding:12,
    borderRadius: 6,
    shadowColor: '#111',
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  option: {
    textAlign: 'center',
    margin: 12,
    padding: 6,
    borderRadius: 6,
    fontWeight: 'bold'

  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24
  }
});

const gameListItem = StyleSheet.create({
  title: {
    fontSize: 32,
    alignItems: 'center',
    margin: 12,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    width: width * 0.66,
    flex: 1,
    padding: 12,
  },
  gameId: {
    textAlign:'left',
    fontSize: 18
  },
  players: {
    flexDirection:'row'
  },
  turn: {
    flex: 1,
    textAlign:'right'
  }
});

module.exports = {
  card: card,
  create: create,
  game: game,
  login: login,
  openGames: openGames,
  popup: popup,
  gameListItem: gameListItem,
}
