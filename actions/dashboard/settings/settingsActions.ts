"use server";

import prisma from "@/lib/db";

interface updateOrCreateGeneralSettingsProps {
  title: string;
  logoImage: string;
  description?: string | undefined;
  brandName?: string | undefined;
  faviconImage: string;
  phone:string,
}

export async function updateOrCreateGeneralSettings(
  data: updateOrCreateGeneralSettingsProps
) {
  try {
    const alreadExist = await prisma.generalSettings.findMany({});

    if (alreadExist.length > 0) {
      await prisma.generalSettings.update({
        where: {
          id: alreadExist[0].id,
        },
        data: data,
      });
    } else {
      await prisma.generalSettings.create({
        data: data,
      });
    }

    return {
      status: 200,
      message: "General settings updated successfully",
    };
  } catch (error) {
    console.log("[updateOrCreateGeneralSettings]", error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}



export async function getGeneralSetting () {
  try {
    const generalSettings = await prisma.generalSettings.findMany({});
    return {
      status: 200, 
      message: "General settings fetched successfully",
      data: generalSettings
    }
  } catch (error) {
    console.log("[get general setting error]", error); 
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}