-- AddForeignKey
ALTER TABLE "pollutions" ADD CONSTRAINT "pollutions_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "utilisateurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
