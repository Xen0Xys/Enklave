-- CreateEnum
CREATE TYPE "public"."folder_types" AS ENUM ('MEDIA');

-- CreateTable
CREATE TABLE "public"."newsletter_subscriptions" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jwt_id" BYTEA NOT NULL,
    "master_key" BYTEA NOT NULL,
    "public_key" BYTEA NOT NULL,
    "private_key" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."server_files" (
    "id" UUID NOT NULL,
    "s3_key" UUID NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "mime_type" VARCHAR(50),
    "file_key" BYTEA NOT NULL,
    "iv" BYTEA NOT NULL,
    "auth_tag" BYTEA NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "server_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."avatars" (
    "user_id" UUID NOT NULL,
    "server_file_id" UUID NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."folders" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "folder_key" BYTEA NOT NULL,
    "name" VARCHAR(100),
    "type" "public"."folder_types",
    "parent_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."files" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "file_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "folder_id" UUID,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_key" ON "public"."newsletter_subscriptions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "server_files_s3_key_key" ON "public"."server_files"("s3_key");

-- CreateIndex
CREATE UNIQUE INDEX "avatars_server_file_id_key" ON "public"."avatars"("server_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_name_parent_id_key" ON "public"."folders"("name", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_user_id_type_key" ON "public"."folders"("user_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "files_name_folder_id_key" ON "public"."files"("name", "folder_id");

-- AddForeignKey
ALTER TABLE "public"."avatars" ADD CONSTRAINT "avatars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avatars" ADD CONSTRAINT "avatars_server_file_id_fkey" FOREIGN KEY ("server_file_id") REFERENCES "public"."server_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "public"."server_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
