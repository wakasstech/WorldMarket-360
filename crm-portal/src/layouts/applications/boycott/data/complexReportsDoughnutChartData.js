/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Image
import adobeXD from "assets/images/small-logos/logo-xd.svg";
import atlassian from "assets/images/small-logos/logo-atlassian.svg";
import slack from "assets/images/small-logos/logo-slack.svg";
import spotify from "assets/images/small-logos/logo-spotify.svg";
import jira from "assets/images/small-logos/logo-jira.svg";

const complexReportsDoughnutChartData = (labelData, dataNumber) => {
  return {
    images: [adobeXD, atlassian, slack, spotify, jira], // Adjust these images as needed
    labels: labelData,
    datasets: {
      label: "Referrals",
      backgroundColors: ["primary", "info", "warning", "success", "dark", "green", "red"], // Adjust colors as needed
      data: dataNumber,
    },
  };
};

export default complexReportsDoughnutChartData;;

