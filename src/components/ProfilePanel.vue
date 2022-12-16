<template>
  <div class="profile panel">
    <img src="../assets/images/img.png" class="profile__image" alt="" />

    <div class="profile-text">
      <div class="profile__heading skeleton"></div>
      <div class="profile__description">
        <div
          class="profile__description-line profile__description-line_1 skeleton"
        />
        <div
          class="profile__description-line profile__description-line_2 skeleton"
        />
        <div
          class="profile__description-line profile__description-line_3 skeleton"
        />
        <div
          class="profile__description-line profile__description-line_4 skeleton"
        />
        <div
          class="profile__description-line profile__description-line_5 skeleton"
        />
        <div
          class="profile__description-line profile__description-line_6 skeleton"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile {
  padding: 18px 14px;
  width: max-content;

  display: flex;
  flex-direction: column;
  row-gap: 20px;

  &__image {
  }

  &-text {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding-inline: 9px;
  }

  &__heading {
    height: 26px;
    border-radius: 8px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    align-items: center;

    &-line {
      height: 10px;
      border-radius: 4px;

      &_1 {
        width: 155px;
      }
      &_2 {
        width: 190px;
      }
      &_3 {
        width: 170px;
      }
      &_4 {
        width: 160px;
      }
      &_5 {
        width: 140px;
      }
      &_6 {
        width: 80px;
      }
    }
  }
}
</style>
