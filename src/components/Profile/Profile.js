import Header from '../Header/Header.js';
import ProfileContent from '../ProfileContent/ProfileContent.js';

export default function Profile() {
  return (
    <main className="profile">
      <Header sectionClass="profile__header"/>
      <ProfileContent />
    </main>
  )
}