async generateAndDownloadTransitFormforGranite() {
    if (!this.companyLogo || !this.qrCodeImage) {
      this.alt.warning('PDF images not available. Please try again.');
      return;
    }
    const data = this.get_generate_Permit_array || {};
    const validation = this.validatePermitData(
      this.get_generate_Permit_array,
      'GRANITE'
    );
    if (!validation.isValid) {
      this.alt.error(
        'Cannot generate Granite permit: ' + validation.errors.join(', ')
      );
      return;
    }

    // if (
    //   data.TRANSIT_NO == '' ||
    //   data.MINERAL_NAME == '' ||
    //   !this.get_generate_Permit_array
    // ) {
    //   this.alt.warning(
    //     'Incomplete data for Print generation. Please try again.'
    //   );
    //   return;
    // }

    const defaultStyle = {
      font: 'sansSerif',
    };

    const headerTextStyle = {
      font: 'sansSerif',
      bold: true,
      alignment: 'left',
    };

    const dataTextStyle = {
      font: 'sansSerif',
      fontSize: 9,
      margin: [0, 2, 0, 2] as [number, number, number, number],
      alignment: 'left' as const,
    };

    const labelTextStyle = {
      font: 'sansSerif',
      bold: true,
      fontSize: 8.5,
      margin: [0, 1, 0, 1] as [number, number, number, number],
      alignment: 'left' as const,
    };

    // Optional watermark background (template/hologram). If available, it will be drawn behind content.
    const backgroundFn = (currentPage: number) => {
      const elements: any[] = [];
      
      // Add template background if available
      if (this.templateBackground) {
        elements.push({
          image: this.templateBackground,
          width: 360,
          absolutePosition: { x: 24, y: 40 },
          opacity: 0.06,
        });
      }
      
      // Add timestamp
      elements.push({
        text: `10/9/25, 8:37 PM`,
        fontSize: 10,
        bold: true,
        absolutePosition: { x: 35, y: 55 },
      });
      
      // Add "DUPLICATE COPY" watermark on page 2 (duplicate section)
      if (currentPage === 2) {
        elements.push({
          text: 'DUPLICATE COPY',
          fontSize: 60,
          bold: true,
          color: '#CCCCCC',
          opacity: 0.3,
          absolutePosition: { x: 150, y: 400 },
          angle: -45,
        });
      }
      
      return elements.length > 0 ? { stack: elements } : null;
    };

    const dd: TDocumentDefinitions = {
      pageSize: 'A4',
      // tighten margins to better match printers; adjust if your printer clips
      pageMargins: [45, 40, 45, 20],
      defaultStyle,
      background: (currentPage: number) => backgroundFn(currentPage),

      content: [
        // HEADER (ORIGINAL)
        {
          columns: [
            { image: this.companyLogo, width: 60, alignment: 'center' },
            {
              stack: [
                // { text: `District Director: ${data.DISTRICT}`, fontSize: 12, bold: true, alignment: 'center', margin: [0, 23, 0, 0] },
                {
                  text: 'TRANSIT FORM (Original)',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 25, 0, 0],
                  alignment: 'center',
                },
              ],
              width: '*',
              alignment: 'center',
            },
            {
              image: this.qrCodeImage,
              width: 35,
              alignment: 'center',
              margin: [0, 10, 15, 0],
            },
          ],
          columnGap: 8,
          margin: [0, 4, 0, 2],
        },

        {
          table: {
            widths: ['30%', '30%', '40%'],
            body: [
              [
                { text: `HSN Code: ${data.HSN_CODE}`, style: labelTextStyle },
                {
                  text: `Stationary No: ${data.STATIONARY_NO}`,
                  style: labelTextStyle,
                },
                {
                  text: `Date & Time of Dispatch: ${data.DISPATCHED_DATE}`,
                  style: labelTextStyle,
                },
              ],
            ],
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 2],
        },

        // MAIN TABLE (ORIGINAL) - using proportional widths, consistent borders/padding, centered
        {
          table: {
            widths: ['25%', '25%', '25%', '25%'],
            body: [
              [
                { text: 'Lessee Id :', style: labelTextStyle },
                { text: data.LESSEE_ID, style: dataTextStyle },
                { text: 'Permit No :', style: labelTextStyle },
                { text: data.PERMIT_NO, style: dataTextStyle },
              ],
              [
                { text: 'Lessee Name :', style: labelTextStyle },
                { text: data.LESSEE_NAME, style: dataTextStyle },
                { text: 'Transit Form No :', style: labelTextStyle },
                { text: data.TRANSIT_NO, style: dataTextStyle },
              ],
              [
                { text: 'Destination :', style: labelTextStyle },
                { text: data.DESTI_LOCATION, style: dataTextStyle },
                { text: 'Mineral Name :', style: labelTextStyle },
                { text: data.MINERAL_NAME, style: dataTextStyle },
              ],
              [
                { text: 'MDL ID :', style: labelTextStyle },
                { text: data.MDL_ID, bold: true, style: dataTextStyle },
                { text: 'MDL Business Location : ' + data.MDL_BLOC_LOCATION, style: dataTextStyle, colSpan: 2 },
                {},
              ],
              [
                { text: 'MDL/Consignee/Company Name :', style: labelTextStyle },
                { text: data.CONSIGNEE_NAME, bold: true, style: dataTextStyle },
                { text: 'Survey No :', style: labelTextStyle },
                { text: data.SURVEY_NO, style: dataTextStyle },
              ],
              [
                { text: 'Village :', style: labelTextStyle },
                { text: data.VILLAGE, style: dataTextStyle },
                { text: 'Mandal :', style: labelTextStyle },
                { text: data.MANDAL, style: dataTextStyle },
              ],
              [
                { text: 'District :', style: labelTextStyle },
                { text: data.DISTRICT, style: dataTextStyle },
                { text: 'Vehicle No :', style: labelTextStyle },
                { text: data.VEHICLE_NO, style: dataTextStyle },
              ],
              [
                { text: 'Driver Name :', style: labelTextStyle },
                { text: data.DRIVER_NAME, bold: true, style: dataTextStyle },
                { text: 'Driver License No :', style: labelTextStyle },
                { text: data.DRIVER_LICENSE_NO, style: dataTextStyle },
              ],
              [
                { text: 'GST No :', style: labelTextStyle },
                { text: data.GST_NO, style: dataTextStyle },
                { text: 'Distance in K.M. :', style: labelTextStyle },
                { text: data.DISTANCE_IN_KM, style: dataTextStyle },
              ],
              [
                { text: 'Required Time :', style: labelTextStyle },
                { text: data.REQUIRED_TIME, style: dataTextStyle },
                { text: 'Dispatch Qty :', style: labelTextStyle },
                { text: `${data.DISPATCH_QTY} Cu.Mts`, style: dataTextStyle },
              ],
            ],
          },
          layout: {
            hLineColor: () => '#000',
            vLineColor: () => '#000',
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 2,
            paddingBottom: () => 2,
          },
        },

        {
          margin: [0, 0, 0, 0], // space between tables
          table: {
            widths: ['28%', '13%', '13%', '13%', '13%', '20%'],
            body: [
              [
                { text: 'Block No :', style: labelTextStyle, colSpan: 2 },
                { text: '', style: labelTextStyle },
                {
                  text: 'Length in [C.M]',
                  style: labelTextStyle,
                },
                {
                  text: 'Breadth in [C.M]',
                  style: labelTextStyle,
                },
                {
                  text: 'Height in [C.M]',
                  style: labelTextStyle,
                },
                { text: 'Total Volume in[Cu.Mts]', style: labelTextStyle },
              ],
              [
                { text: data.DB_NO, style: dataTextStyle, colSpan: 2 },
                { text: '', style: dataTextStyle },
                { text: data.LENGTHS, style: dataTextStyle },
                { text: data.BREADTHS, style: dataTextStyle },
                { text: data.HEIGHTS, style: dataTextStyle },
                { text: data.TOTAL_VOLUME, style: dataTextStyle },
              ],
            ],
          },
          layout: {
            hLineColor: () => '#000',
            vLineColor: () => '#000',
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 2,
            paddingBottom: () => 2,
          },
        },

        {
          text: 'Note: The Transit Form is valid only on the Printed Secured Stationary with Hologram embedded.',
          italics: true,
          fontSize: 10,
          bold: true,
          margin: [0, 2, 0, 2],
        },
        {
          text: "Note: This is System generated document ,does n't require Physical Signature.",
          italics: true,
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 2],
        },
        { text: '', margin: [0, 8], pageBreak: 'after' },

        // DUPLICATE SECTION
        {
          columns: [
            { image: this.companyLogo, width: 60, alignment: 'center' },
            {
              stack: [
                {
                  text: 'TRANSIT FORM (Duplicate)',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 40, 0, 0],
                  alignment: 'center',
                },
              ],
              width: '*',
              alignment: 'center',
            },
            {
              image: this.qrCodeImage,
              width: 35,
              alignment: 'center',
              margin: [0, 25, 13, 0],
            },
          ],
          columnGap: 7,
          margin: [0, 7, 0, 2],
        },

        {
          table: {
            widths: ['30%', '30%', '40%'],
            body: [
              [
                {
                  text: `HSN Code: ${data.HSN_CODE}`,
                  style: labelTextStyle,
                },
                {
                  text: `Stationary No: ${data.STATIONARY_NO}`,
                  style: labelTextStyle,
                },
                {
                  text: `Date & Time of Dispatch: ${data.DISPATCHED_DATE}`,
                  style: labelTextStyle,
                },
              ],
            ],
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 2],
        },

        // DUPLICATE MAIN TABLE (centered)
        {
          table: {
            widths: ['25%', '25%', '25%', '25%'],
            body: [
              [
                { text: 'Lessee Id :', style: labelTextStyle },
                { text: data.LESSEE_ID, style: dataTextStyle },
                { text: 'Permit No :', style: labelTextStyle },
                { text: data.PERMIT_NO, style: dataTextStyle },
              ],
              [
                { text: 'Lessee Name :', style: labelTextStyle },
                { text: data.LESSEE_NAME, style: dataTextStyle },
                { text: 'Transit Form No :', style: labelTextStyle },
                { text: data.TRANSIT_NO, style: dataTextStyle },
              ],
              [
                { text: 'Destination :', style: labelTextStyle },
                { text: data.DESTI_LOCATION, style: dataTextStyle },
                { text: 'Mineral Name :', style: labelTextStyle },
                { text: data.MINERAL_NAME, style: dataTextStyle },
              ],
              [
                { text: 'MDL ID :', style: labelTextStyle },
                { text: data.MDL_ID, bold: true, style: dataTextStyle },
                { text: 'MDL Business Location : ' + data.MDL_BLOC_LOCATION, style: dataTextStyle, colSpan: 2 },
                {},
              ],
              [
                { text: 'MDL/Consignee/Company Name :', style: labelTextStyle },
                { text: data.CONSIGNEE_NAME, bold: true, style: dataTextStyle },
                { text: 'Survey No :', style: labelTextStyle },
                { text: data.SURVEY_NO, style: dataTextStyle },
              ],
              [
                { text: 'Village :', style: labelTextStyle },
                { text: data.VILLAGE, style: dataTextStyle },
                { text: 'Mandal :', style: labelTextStyle },
                { text: data.MANDAL, style: dataTextStyle },
              ],
              [
                { text: 'District :', style: labelTextStyle },
                { text: data.DISTRICT, style: dataTextStyle },
                { text: 'Vehicle No :', style: labelTextStyle },
                { text: data.VEHICLE_NO, style: dataTextStyle },
              ],
              [
                { text: 'Driver Name :', style: labelTextStyle },
                { text: data.DRIVER_NAME, bold: true, style: dataTextStyle },
                { text: 'Driver License No :', style: labelTextStyle },
                { text: data.DRIVER_LICENSE_NO, style: dataTextStyle },
              ],
              [
                { text: 'GST No :', style: labelTextStyle },
                { text: data.GST_NO, style: dataTextStyle },
                { text: 'Distance in K.M. :', style: labelTextStyle },
                { text: data.DISTANCE_IN_KM, style: dataTextStyle },
              ],
              [
                { text: 'Required Time :', style: labelTextStyle },
                { text: data.REQUIRED_TIME, style: dataTextStyle },
                { text: 'Dispatch Qty :', style: labelTextStyle },
                { text: `${data.DISPATCH_QTY} Cu.Mts`, style: dataTextStyle },
              ],
            ],
          },
          layout: {
            hLineColor: () => '#000',
            vLineColor: () => '#000',
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 2,
            paddingBottom: () => 2,
          },
        },
        {
          margin: [0, 0, 0, 0], // space between tables
          table: {
            widths: ['28%', '13%', '13%', '13%', '13%', '20%'],
            body: [
              [
                { text: 'Block No :', style: labelTextStyle, colSpan: 2 },
                { text: '', style: labelTextStyle },
                { text: 'Length in [C.M]', style: labelTextStyle },
                { text: 'Breadth in [C.M]', style: labelTextStyle },
                { text: 'Height in [C.M]', style: labelTextStyle },
                { text: 'Total Volume in[Cu.Mts]', style: labelTextStyle },
              ],
              [
                { text: data.DB_NO, style: dataTextStyle, colSpan: 2 },
                { text: '', style: dataTextStyle },
                { text: data.LENGTHS, style: dataTextStyle },
                { text: data.BREADTHS, style: dataTextStyle },
                { text: data.HEIGHTS, style: dataTextStyle },
                { text: data.TOTAL_VOLUME, style: dataTextStyle },
              ],
            ],
          },
          layout: {
            hLineColor: () => '#000',
            vLineColor: () => '#000',
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 2,
            paddingBottom: () => 2,
          },
        },

        {
          text: 'Note: The Transit Form is valid only on the Printed Secured Stationary with Hologram embedded',
          italics: true,
          fontSize: 10,
          bold: true,
          margin: [0, 2, 0, 2],
        },
        {
          text: "Note: This is System generated document ,does n't require Physical Signature.",
          bold: true,
          italics: true,
          fontSize: 10,
          margin: [0, 0, 0, 10],
        },
        {
          columns: [
            {
              text: data.DMGO_OFFICER,
              bold: true,
              fontSize: 12,
              alignment: 'center',
            },
            {
              text: 'Signature of Driver',
              bold: true,
              fontSize: 12,
              alignment: 'center',
            },
          ],
          margin: [0, 30, 0, 0],
        },
      ],
    };

    // pdfMake.createPdf(dd).print();

    pdfMake.createPdf(dd).getBlob((blob: Blob) => {
      this.pdfBlob = blob;
      this.pdfPathReportString = URL.createObjectURL(blob);
      this.ispdfModalVisible = true;
    });

  }
