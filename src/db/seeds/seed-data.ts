import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { Artist } from 'src/resources/artists/artist.entity';
import { Playlist } from 'src/resources/playlists/playlist.entity';
import { Song } from 'src/resources/songs/song.entity';
import { User } from 'src/resources/users/user.entity';
import { EntityManager } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
export const seedData = async (manager: EntityManager): Promise<void> => {
  //1
  // Add your seeding logic here using the manager
  // For example:
  for (let i = 0; i < 21; i++) {
    await seedUser();
    await seedSong();
    await seedArtist();
    await seedPlayLists();
  }

  async function seedUser() {
    //2
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();
    await manager.getRepository(User).save(user);
  }

  async function seedSong() {
    const song = new Song();
    song.title = faker.music.songName();
    song.releaseDate = faker.date.past({ years: 70 });

    const minutes = faker.number.int({ min: 1, max: 21 });
    const seconds = faker.number.int({ min: 1, max: 59 });
    song.duration = `${minutes}:${seconds}`;

    song.lyrics = faker.lorem.sentences();
    song.playlist = await seedPlayLists();
    song.artists = [await seedArtist()];

    await manager.getRepository(Song).save(song);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();
    const artist = new Artist();
    artist.name = user.firstName + ' ' + user.lastName;
    artist.user = user;

    await manager.getRepository(User).save(user);
    const savedArtist = await manager.getRepository(Artist).save(artist);
    return savedArtist;
  }

  async function seedPlayLists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();
    const playList = new Playlist();
    playList.name = faker.music.genre();
    playList.user = user;

    await manager.getRepository(User).save(user);
    const savedPlaylist = await manager.getRepository(Playlist).save(playList);
    return savedPlaylist;
  }
};
